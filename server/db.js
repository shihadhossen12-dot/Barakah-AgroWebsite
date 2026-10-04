import 'dotenv/config';
import pg from 'pg';
import crypto from 'crypto';

const { Pool } = pg;

let pool = null;
let useMock = false;
const inMemoryOrders = [];
const inMemoryUsers = [];

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    });
  } catch (err) {
    console.warn('[AI Studio] PostgreSQL pool init failed, fallback to in-memory store:', err);
    useMock = true;
  }
} else {
  console.warn('[AI Studio] DATABASE_URL is not configured. Using in-memory store.');
  useMock = true;
}

export async function initDb() {
  if (pool && !useMock) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL UNIQUE,
          email TEXT,
          password_hash TEXT NOT NULL,
          salt TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL,
          status TEXT NOT NULL,
          payment_method TEXT,
          customer JSONB NOT NULL,
          note TEXT,
          delivery_location TEXT,
          items JSONB NOT NULL,
          subtotal NUMERIC NOT NULL DEFAULT 0,
          discount NUMERIC NOT NULL DEFAULT 0,
          delivery_fee NUMERIC NOT NULL DEFAULT 0,
          total NUMERIC NOT NULL DEFAULT 0
        );

          CREATE TABLE IF NOT EXISTS carts (
          user_id TEXT PRIMARY KEY,
          items JSONB NOT NULL DEFAULT '[]'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS customer_sessions (
          token_hash TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL
        );

        ALTER TABLE users ADD COLUMN IF NOT EXISTS district TEXT;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT;

        -- Add user_id column if table was previously created without it
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='user_id') THEN
            ALTER TABLE orders ADD COLUMN user_id TEXT;
          END IF;
        END $$;
      `);
      console.log('PostgreSQL database connected (users & orders tables initialized).');
      return;
    } catch (err) {
      console.warn('PostgreSQL table init failed, switching to in-memory store:', err);
      useMock = true;
    }
  }
  console.log('In-memory store initialized.');
}

// --------------------------------------------------------------------------
// USER DATABASE METHODS
// --------------------------------------------------------------------------
export async function createUser(userData) {
  const user = {
    id: userData.id,
    name: userData.name,
    phone: userData.phone,
    email: userData.email || null,
    passwordHash: userData.passwordHash,
    salt: userData.salt,
    createdAt: userData.createdAt || new Date().toISOString(),
    updatedAt: userData.updatedAt || new Date().toISOString()
  };

  if (pool && !useMock) {
    try {
      await pool.query(
        `
        INSERT INTO users (id, name, phone, email, password_hash, salt, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          user.id,
          user.name,
          user.phone,
          user.email,
          user.passwordHash,
          user.salt,
          user.createdAt,
          user.updatedAt
        ]
      );
      return user;
    } catch (err) {
      console.warn('PostgreSQL createUser failed, fallback to in-memory:', err);
      useMock = true;
    }
  }

  inMemoryUsers.push(user);
  return user;
}

export async function findUserByPhone(phone) {
  const cleanPhone = String(phone).trim();
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        `SELECT id, name, phone, email, password_hash AS "passwordHash", salt, created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE phone = $1`,
        [cleanPhone]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.warn('PostgreSQL findUserByPhone failed, fallback to in-memory:', err);
      useMock = true;
    }
  }

  return inMemoryUsers.find(u => u.phone === cleanPhone) || null;
}

export async function findUserByEmail(email) {
  if (!email) return null;
  const cleanEmail = String(email).trim().toLowerCase();
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        `SELECT id, name, phone, email, password_hash AS "passwordHash", salt, created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE LOWER(email) = $1`,
        [cleanEmail]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.warn('PostgreSQL findUserByEmail failed, fallback to in-memory:', err);
      useMock = true;
    }
  }

  return inMemoryUsers.find(u => u.email && u.email.toLowerCase() === cleanEmail) || null;
}

export async function findUserById(id) {
  if (!id) return null;
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        `SELECT id, name, phone, email, created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE id = $1`,
        [id]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.warn('PostgreSQL findUserById failed, fallback to in-memory:', err);
      useMock = true;
    }
  }

  const u = inMemoryUsers.find(user => user.id === id);
  if (!u) return null;
  return {
    id: u.id,
    name: u.name,
    phone: u.phone,
    email: u.email,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  };
}

// --------------------------------------------------------------------------
// ORDERS DATABASE METHODS
// --------------------------------------------------------------------------
export async function createOrder(order) {
  if (pool && !useMock) {
    try {
      await pool.query(
        `
        INSERT INTO orders (
          id,
          user_id,
          created_at,
          updated_at,
          status,
          payment_method,
          customer,
          note,
          delivery_location,
          items,
          subtotal,
          discount,
          delivery_fee,
          total
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        `,
        [
          order.id,
          order.userId || null,
          order.createdAt,
          order.updatedAt,
          order.status,
          order.paymentMethod,
          JSON.stringify(order.customer),
          order.note,
          order.deliveryLocation,
          JSON.stringify(order.items),
          order.subtotal,
          order.discount,
          order.deliveryFee,
          order.total
        ]
      );
      return order;
    } catch (err) {
      console.warn('PostgreSQL createOrder failed, falling back to in-memory store:', err);
      useMock = true;
    }
  }

  inMemoryOrders.unshift(order);
  return order;
}

export async function getOrders() {
  if (pool && !useMock) {
    try {
      const result = await pool.query(`
        SELECT
          id,
          user_id AS "userId",
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          status,
          payment_method AS "paymentMethod",
          customer,
          note,
          delivery_location AS "deliveryLocation",
          items,
          subtotal,
          discount,
          delivery_fee AS "deliveryFee",
          total
        FROM orders
        ORDER BY created_at DESC
      `);
      return result.rows;
    } catch (err) {
      console.warn('PostgreSQL getOrders failed, falling back to in-memory store:', err);
      useMock = true;
    }
  }

  return inMemoryOrders;
}

export async function getOrdersByUserId(userId) {
  if (!userId) return [];
  if (pool && !useMock) {
    try {
      const result = await pool.query(
        `
        SELECT
          id,
          user_id AS "userId",
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          status,
          payment_method AS "paymentMethod",
          customer,
          note,
          delivery_location AS "deliveryLocation",
          items,
          subtotal,
          discount,
          delivery_fee AS "deliveryFee",
          total
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
      );
      return result.rows;
    } catch (err) {
      console.warn('PostgreSQL getOrdersByUserId failed, fallback to in-memory:', err);
      useMock = true;
    }
  }

  return inMemoryOrders.filter(o => o.userId === userId);
}

export async function updateOrderStatus(id, status) {
  if (pool && !useMock) {
    try {
      const result = await pool.query(
        `
        UPDATE orders
        SET
          status = $1,
          updated_at = $2
        WHERE id = $3
        RETURNING
          id,
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          status,
          payment_method AS "paymentMethod",
          customer,
          note,
          delivery_location AS "deliveryLocation",
          items,
          subtotal,
          discount,
          delivery_fee AS "deliveryFee",
          total
        `,
        [status, new Date().toISOString(), id]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.warn('PostgreSQL updateOrderStatus failed, falling back to in-memory store:', err);
      useMock = true;
    }
  }

  const order = inMemoryOrders.find(o => o.id === id);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }
  return null;
}

export async function deleteOrder(id) {
  if (pool && !useMock) {
    try {
      const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING id', [id]);
      return result.rowCount > 0;
    } catch (err) {
      console.warn('PostgreSQL deleteOrder failed:', err);
      return false;
    }
  }

  const index = inMemoryOrders.findIndex(o => o.id === id);
  if (index === -1) return false;
  inMemoryOrders.splice(index, 1);
  return true;
}

// ==========================================================================
// CART + SESSION + PROFILE METHODS
// ==========================================================================
const inMemoryCarts = new Map();
const inMemorySessions = new Map();

function sessionKey(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

// ---- Cart (one saved cart per logged-in customer) ----
export async function getCartByUserId(userId) {
  if (!userId) return [];
  if (pool && !useMock) {
    try {
      const res = await pool.query('SELECT items FROM carts WHERE user_id = $1', [userId]);
      return res.rows[0]?.items || [];
    } catch (err) {
      console.warn('PostgreSQL getCartByUserId failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  return inMemoryCarts.get(userId) || [];
}

export async function saveCartForUser(userId, items) {
  if (!userId) return [];
  const cleanItems = Array.isArray(items) ? items : [];
  if (pool && !useMock) {
    try {
      await pool.query(
        `
        INSERT INTO carts (user_id, items, updated_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET items = EXCLUDED.items, updated_at = EXCLUDED.updated_at
        `,
        [userId, JSON.stringify(cleanItems), new Date().toISOString()]
      );
      return cleanItems;
    } catch (err) {
      console.warn('PostgreSQL saveCartForUser failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  inMemoryCarts.set(userId, cleanItems);
  return cleanItems;
}

// ---- Login sessions (saved in DB, so a server restart does not log users out) ----
export async function createSession(token, userId, days = 30) {
  const key = sessionKey(token);
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
  if (pool && !useMock) {
    try {
      await pool.query(
        'INSERT INTO customer_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)',
        [key, userId, expiresAt]
      );
      return;
    } catch (err) {
      console.warn('PostgreSQL createSession failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  inMemorySessions.set(key, { userId, expiresAt });
}

export async function getSessionUserId(token) {
  if (!token) return null;
  const key = sessionKey(token);
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        'SELECT user_id FROM customer_sessions WHERE token_hash = $1 AND expires_at > NOW()',
        [key]
      );
      return res.rows[0]?.user_id || null;
    } catch (err) {
      console.warn('PostgreSQL getSessionUserId failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  const s = inMemorySessions.get(key);
  if (!s || new Date(s.expiresAt) < new Date()) return null;
  return s.userId;
}

export async function deleteSession(token) {
  if (!token) return;
  const key = sessionKey(token);
  if (pool && !useMock) {
    try {
      await pool.query('DELETE FROM customer_sessions WHERE token_hash = $1', [key]);
      return;
    } catch (err) {
      console.warn('PostgreSQL deleteSession failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  inMemorySessions.delete(key);
}

// ---- Customer profile (name, phone, email, district, address) ----
export async function getUserProfile(id) {
  if (!id) return null;
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        `SELECT id, name, phone, email, district, address,
                created_at AS "createdAt", updated_at AS "updatedAt"
         FROM users WHERE id = $1`,
        [id]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.warn('PostgreSQL getUserProfile failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  const u = inMemoryUsers.find(user => user.id === id);
  if (!u) return null;
  return {
    id: u.id, name: u.name, phone: u.phone, email: u.email,
    district: u.district || null, address: u.address || null,
    createdAt: u.createdAt, updatedAt: u.updatedAt
  };
}

export async function updateUserProfile(id, data) {
  const name = String(data.name || '').trim();
  const email = data.email ? String(data.email).trim().toLowerCase() : null;
  const district = data.district ? String(data.district).trim() : null;
  const address = data.address ? String(data.address).trim() : null;
  const now = new Date().toISOString();

  if (pool && !useMock) {
    try {
      await pool.query(
        `UPDATE users SET name = $1, email = $2, district = $3, address = $4, updated_at = $5 WHERE id = $6`,
        [name, email, district, address, now, id]
      );
      return getUserProfile(id);
    } catch (err) {
      console.warn('PostgreSQL updateUserProfile failed, fallback to in-memory:', err);
      useMock = true;
    }
  }
  const u = inMemoryUsers.find(user => user.id === id);
  if (!u) return null;
  Object.assign(u, { name, email, district, address, updatedAt: now });
  return getUserProfile(id);
}

