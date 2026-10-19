import 'dotenv/config';
import mysql from 'mysql2/promise';
import crypto from 'crypto';

let pool = null;
let useMock = false;
const databaseConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
const hasDatabaseConfig = Boolean(
  databaseConfig.host || databaseConfig.user || databaseConfig.password || databaseConfig.database
);
const hasCompleteDatabaseConfig = Boolean(
  databaseConfig.host && databaseConfig.user && databaseConfig.password && databaseConfig.database
);
const inMemoryOrders = [];
const inMemoryUsers = [];
const inMemoryCatalog = { products: [], deletedIds: [] };
const inMemoryContactMessages = [];

if (hasCompleteDatabaseConfig) {
  try {
    const mysqlPool = mysql.createPool({
      ...databaseConfig,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 5),
      charset: 'utf8mb4',
      timezone: 'Z',
      flags: ['+FOUND_ROWS']
    });
    pool = {
      async query(statement, params = []) {
        const sql = statement
          .replace(/\$\d+/g, '?')
          .replace(/\s+AS\s+"([^"]+)"/g, ' AS `$1`');
        const values = params.map((value) => {
          if (typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(value)) {
            return new Date(value);
          }
          if (value && typeof value === 'object' && !Buffer.isBuffer(value) && !(value instanceof Date)) {
            return JSON.stringify(value);
          }
          return value;
        });
        const [result] = await mysqlPool.query(sql, values);
        return Array.isArray(result)
          ? { rows: result, rowCount: result.length }
          : { rows: [], rowCount: result.affectedRows || 0, insertId: result.insertId };
      }
    };
  } catch (err) {
    console.warn('MySQL pool initialization failed:', err);
    throw err;
  }
} else {
  console.warn('MySQL is not configured. Using in-memory store for local development.');
  useMock = true;
}

function handleDatabaseError(err) {
  if (hasCompleteDatabaseConfig) throw err;
  useMock = true;
}

export async function initDb({ required = false } = {}) {
  if (hasDatabaseConfig && !hasCompleteDatabaseConfig) {
    throw new Error('MySQL configuration is incomplete. Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.');
  }
  if (required && !hasCompleteDatabaseConfig) {
    const detail = process.env.DATABASE_URL
      ? 'DATABASE_URL is PostgreSQL; configure Hostinger MySQL DB_* variables.'
      : 'Production requires Hostinger MySQL settings: DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.';
    throw new Error(detail);
  }
  if (pool && !useMock) {
    try {
      const statements = [
        `CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(32) NOT NULL UNIQUE,
          email VARCHAR(255),
          password_hash VARCHAR(255) NOT NULL,
          salt VARCHAR(255) NOT NULL,
          district VARCHAR(255),
          address TEXT,
          created_at DATETIME(3) NOT NULL,
          updated_at DATETIME(3) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(100) PRIMARY KEY,
          user_id VARCHAR(100),
          created_at DATETIME(3) NOT NULL,
          updated_at DATETIME(3) NOT NULL,
          status VARCHAR(40) NOT NULL,
          payment_method TEXT,
          customer JSON NOT NULL,
          note TEXT,
          delivery_location VARCHAR(40),
          items JSON NOT NULL,
          subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
          discount DECIMAL(12,2) NOT NULL DEFAULT 0,
          delivery_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
          total DECIMAL(12,2) NOT NULL DEFAULT 0,
          INDEX orders_user_created_idx (user_id, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS carts (
          user_id VARCHAR(100) PRIMARY KEY,
          items JSON NOT NULL,
          updated_at DATETIME(3) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS chat_messages (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          user_id VARCHAR(100) NOT NULL,
          sender VARCHAR(20) NOT NULL,
          text TEXT NOT NULL,
          created_at DATETIME(3) NOT NULL,
          read_by_admin BOOLEAN NOT NULL DEFAULT FALSE,
          INDEX chat_user_id_idx (user_id, id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS managed_products (
          id VARCHAR(100) PRIMARY KEY,
          product JSON NOT NULL,
          deleted BOOLEAN NOT NULL DEFAULT FALSE,
          updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS contact_messages (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(32) NOT NULL,
          subject VARCHAR(255),
          message TEXT NOT NULL,
          created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          read_by_admin BOOLEAN NOT NULL DEFAULT FALSE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS customer_sessions (
          token_hash VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(100) NOT NULL,
          expires_at DATETIME(3) NOT NULL,
          INDEX sessions_expiry_idx (expires_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        `CREATE TABLE IF NOT EXISTS reviews (
          id VARCHAR(100) PRIMARY KEY,
          product_id VARCHAR(20) NOT NULL,
          user_id VARCHAR(100) NULL,
          name VARCHAR(60) NOT NULL,
          location VARCHAR(80),
          rating TINYINT NOT NULL,
          text TEXT NOT NULL,
          image MEDIUMTEXT,
          verified BOOLEAN NOT NULL DEFAULT FALSE,
          created_at DATETIME(3) NOT NULL,
          admin_reply TEXT,
          admin_reply_at DATETIME(3),
          UNIQUE KEY reviews_product_user_idx (product_id, user_id),
          KEY reviews_product_idx (product_id, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
      ];
      for (const statement of statements) await pool.query(statement);
      console.log('MySQL database connected (application tables initialized).');
      return;
    } catch (err) {
      console.error('MySQL table initialization failed:', err);
      throw err;
    }
  }
  console.log('In-memory store initialized.');
}

export async function getManagedProducts() {
  if (pool && !useMock) {
    try {
      const result = await pool.query('SELECT id, product, deleted FROM managed_products');
      return { products: result.rows.filter(r => !r.deleted).map(r => r.product), deletedIds: result.rows.filter(r => r.deleted).map(r => r.id) };
    } catch (err) {
      console.warn('MySQL getManagedProducts failed:', err);
      handleDatabaseError(err);
    }
  }
  return { products: [...inMemoryCatalog.products], deletedIds: [...inMemoryCatalog.deletedIds] };
}

export async function saveManagedProduct(product) {
  const id = String(product.id);
  if (pool && !useMock) {
    await pool.query(`INSERT INTO managed_products(id, product, deleted, updated_at) VALUES($1,$2,FALSE,NOW()) ON DUPLICATE KEY UPDATE product=VALUES(product), deleted=FALSE, updated_at=NOW()`, [id, product]);
  } else {
    inMemoryCatalog.deletedIds = inMemoryCatalog.deletedIds.filter(x => x !== id);
    const i = inMemoryCatalog.products.findIndex(p => String(p.id) === id);
    if (i < 0) inMemoryCatalog.products.push(product); else inMemoryCatalog.products[i] = product;
  }
  return product;
}

export async function removeManagedProduct(id) {
  const key = String(id);
  if (pool && !useMock) {
    await pool.query(`INSERT INTO managed_products(id, product, deleted, updated_at) VALUES($1,'{}',TRUE,NOW()) ON DUPLICATE KEY UPDATE deleted=TRUE, updated_at=NOW()`, [key]);
  } else {
    inMemoryCatalog.products = inMemoryCatalog.products.filter(p => String(p.id) !== key);
    if (!inMemoryCatalog.deletedIds.includes(key)) inMemoryCatalog.deletedIds.push(key);
  }
}

export async function addContactMessage(data) {
  const item = { id: 0, name: data.name, phone: data.phone, subject: data.subject || '', message: data.message, createdAt: new Date().toISOString(), readByAdmin: false };
  if (pool && !useMock) {
    const result = await pool.query('INSERT INTO contact_messages(name,phone,subject,message,created_at) VALUES($1,$2,$3,$4,$5)', [item.name,item.phone,item.subject,item.message,item.createdAt]);
    return { ...item, id: result.insertId };
  }
  item.id = Date.now(); inMemoryContactMessages.unshift(item); return item;
}

export async function getContactMessages(markRead = false) {
  if (pool && !useMock) {
    if (markRead) await pool.query('UPDATE contact_messages SET read_by_admin=TRUE WHERE read_by_admin=FALSE');
    const r = await pool.query('SELECT id,name,phone,subject,message,created_at AS "createdAt",read_by_admin AS "readByAdmin" FROM contact_messages ORDER BY created_at DESC LIMIT 200');
    return { messages: r.rows, unread: r.rows.filter(m => !m.readByAdmin).length };
  }
  if (markRead) inMemoryContactMessages.forEach(m => m.readByAdmin = true);
  return { messages: inMemoryContactMessages.slice(0,200), unread: inMemoryContactMessages.filter(m => !m.readByAdmin).length };
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
      console.warn('MySQL createUser failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL findUserByPhone failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL findUserByEmail failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL findUserById failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL createOrder failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL getOrders failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL getOrdersByUserId failed:', err);
      handleDatabaseError(err);
    }
  }

  return inMemoryOrders.filter(o => o.userId === userId);
}

export async function updateOrderStatus(id, status) {
  if (pool && !useMock) {
    try {
      const result = await pool.query(
        `UPDATE orders SET status = $1, updated_at = $2 WHERE id = $3`,
        [status, new Date().toISOString(), id]
      );
      if (!result.rowCount) return null;
      const updated = await pool.query(
        `SELECT
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
        FROM orders WHERE id = $1`,
        [id]
      );
      return updated.rows[0] || null;
    } catch (err) {
      console.warn('MySQL updateOrderStatus failed:', err);
      handleDatabaseError(err);
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
      const result = await pool.query('DELETE FROM orders WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch (err) {
      console.warn('MySQL deleteOrder failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL getCartByUserId failed:', err);
      handleDatabaseError(err);
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
        ON DUPLICATE KEY UPDATE items = VALUES(items), updated_at = VALUES(updated_at)
        `,
        [userId, JSON.stringify(cleanItems), new Date().toISOString()]
      );
      return cleanItems;
    } catch (err) {
      console.warn('MySQL saveCartForUser failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL createSession failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL getSessionUserId failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL deleteSession failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL getUserProfile failed:', err);
      handleDatabaseError(err);
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
      console.warn('MySQL updateUserProfile failed:', err);
      handleDatabaseError(err);
    }
  }
  const u = inMemoryUsers.find(user => user.id === id);
  if (!u) return null;
  Object.assign(u, { name, email, district, address, updatedAt: now });
  return getUserProfile(id);
}

export async function updateUserPassword(id, passwordHash, salt) {
  const now = new Date().toISOString();
  if (pool && !useMock) {
    try {
      await pool.query(
        `UPDATE users SET password_hash = $1, salt = $2, updated_at = $3 WHERE id = $4`,
        [passwordHash, salt, now, id]
      );
      return true;
    } catch (err) {
      console.warn('MySQL updateUserPassword failed:', err);
      handleDatabaseError(err);
    }
  }
  const u = inMemoryUsers.find(user => user.id === id);
  if (!u) return false;
  Object.assign(u, { passwordHash, salt, updatedAt: now });
  return true;
}


// ==========================================================================
// CHAT METHODS (customer <-> admin messages)
// ==========================================================================
const inMemoryChat = [];
let inMemoryChatSeq = 0;

export async function addChatMessage(userId, sender, text) {
  const createdAt = new Date().toISOString();
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        `INSERT INTO chat_messages (user_id, sender, text, created_at, read_by_admin)
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, sender, text, createdAt, sender === 'admin']
      );
      return { id: res.insertId, userId, sender, text, createdAt };
    } catch (err) {
      console.warn('MySQL addChatMessage failed:', err);
      handleDatabaseError(err);
    }
  }
  const msg = { id: ++inMemoryChatSeq, userId, sender, text, createdAt, readByAdmin: sender === 'admin' };
  inMemoryChat.push(msg);
  return { id: msg.id, userId, sender, text, createdAt };
}

export async function getChatMessages(userId, afterId = 0) {
  if (!userId) return [];
  if (pool && !useMock) {
    try {
      const res = await pool.query(
        `SELECT id, user_id AS "userId", sender, text, created_at AS "createdAt"
         FROM chat_messages WHERE user_id = $1 AND id > $2 ORDER BY id ASC LIMIT 300`,
        [userId, afterId]
      );
      return res.rows;
    } catch (err) {
      console.warn('MySQL getChatMessages failed:', err);
      handleDatabaseError(err);
    }
  }
  return inMemoryChat
    .filter(m => m.userId === userId && m.id > afterId)
    .map(m => ({ id: m.id, userId: m.userId, sender: m.sender, text: m.text, createdAt: m.createdAt }));
}

export async function markChatReadByAdmin(userId) {
  if (pool && !useMock) {
    try {
      await pool.query(
        `UPDATE chat_messages SET read_by_admin = TRUE WHERE user_id = $1 AND sender = 'customer' AND read_by_admin = FALSE`,
        [userId]
      );
      return;
    } catch (err) {
      console.warn('MySQL markChatReadByAdmin failed:', err);
      handleDatabaseError(err);
    }
  }
  inMemoryChat.forEach(m => { if (m.userId === userId && m.sender === 'customer') m.readByAdmin = true; });
}

export async function getChatThreads() {
  if (pool && !useMock) {
    try {
      const res = await pool.query(`
        SELECT u.id AS "userId", u.name, u.phone,
               m.text AS "lastText", m.sender AS "lastSender", m.created_at AS "lastAt",
               (SELECT COUNT(*) FROM chat_messages c
                 WHERE c.user_id = u.id AND c.sender = 'customer' AND c.read_by_admin = FALSE) AS unread
        FROM users u
        JOIN chat_messages m ON m.id = (
          SELECT MAX(latest.id) FROM chat_messages latest WHERE latest.user_id = u.id
        )
        ORDER BY m.created_at DESC
      `);
      return res.rows;
    } catch (err) {
      console.warn('MySQL getChatThreads failed:', err);
      handleDatabaseError(err);
    }
  }
  const ids = [...new Set(inMemoryChat.map(m => m.userId))];
  return ids.map(id => {
    const msgs = inMemoryChat.filter(m => m.userId === id);
    const last = msgs[msgs.length - 1];
    const u = inMemoryUsers.find(x => x.id === id) || {};
    return {
      userId: id, name: u.name || '', phone: u.phone || '',
      lastText: last.text, lastSender: last.sender, lastAt: last.createdAt,
      unread: msgs.filter(m => m.sender === 'customer' && !m.readByAdmin).length
    };
  }).sort((a, b) => new Date(b.lastAt) - new Date(a.lastAt));
}


// reviews.js এই ফাংশন দিয়ে একই ডাটাবেস কানেকশন ব্যবহার করে
export function getDbHandle() {
  return { pool: pool && !useMock ? pool : null };
}
