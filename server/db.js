import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dbFile = path.join(dataDir, 'orders.json');

function ensureDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ orders: [] }, null, 2));
}

export function readDb() {
  ensureDb();
  try { return JSON.parse(fs.readFileSync(dbFile, 'utf8')); }
  catch { return { orders: [] }; }
}

function writeDb(db) {
  ensureDb();
  const tmp = `${dbFile}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, dbFile);
}

export function createOrder(order) {
  const db = readDb();
  db.orders.unshift(order);
  writeDb(db);
  return order;
}

export function getOrders() { return readDb().orders; }

export function updateOrderStatus(id, status) {
  const db = readDb();
  const order = db.orders.find(o => o.id === id);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  writeDb(db);
  return order;
}
