import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
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
    )
  `);

  console.log('PostgreSQL database connected.');
}

export async function createOrder(order) {
  await pool.query(
    `
    INSERT INTO orders (
      id,
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
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
    )
    `,
    [
      order.id,
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
}

export async function getOrders() {
  const result = await pool.query(`
    SELECT
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
    FROM orders
    ORDER BY created_at DESC
  `);

  return result.rows;
}

export async function updateOrderStatus(id, status) {
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
}
