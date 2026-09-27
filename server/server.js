import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { createOrder, getOrders, updateOrderStatus } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const app = express();
const PORT = Number(process.env.PORT || 3000);
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const sessions = new Set();
const allowedStatuses = ['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'];

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

function auth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token || !sessions.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function makeOrderId() {
  return `BA-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

app.post('/api/admin/login', (req, res) => {
  if (!ADMIN_PASSWORD) return res.status(503).json({ error: 'Admin password is not configured. Set ADMIN_PASSWORD in .env.' });
  const { username, password } = req.body || {};
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'ভুল username অথবা password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  sessions.add(token);
  res.json({ token });
});

app.post('/api/admin/logout', auth, (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) sessions.delete(token);
  res.json({ ok: true });
});

app.get('/api/admin/orders', auth, (req, res) => res.json({ orders: getOrders() }));

app.patch('/api/admin/orders/:id/status', auth, (req, res) => {
  const { status } = req.body || {};
  if (!allowedStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const order = updateOrderStatus(req.params.id, status);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ order });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/orders', (req, res) => {
  const body = req.body || {};
  const { customer, items, deliveryLocation, deliveryFee, subtotal, discount, total, paymentMethod, note } = body;
  if (!customer?.name || !customer?.phone || !customer?.district || !customer?.address) {
    return res.status(400).json({ error: 'Customer information is incomplete.' });
  }
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Cart is empty.' });

  const cleanItems = items.map(item => ({
    id: String(item.id ?? ''),
    name: String(item.banglaName ?? item.name ?? ''),
    packageLabel: String(item.packageLabel ?? ''),
    price: Number(item.price) || 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    image: String(item.image ?? '')
  }));

  const order = {
    id: makeOrderId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending',
    paymentMethod: paymentMethod || 'Cash on Delivery',
    customer: {
      name: String(customer.name).trim(),
      phone: String(customer.phone).trim(),
      district: String(customer.district).trim(),
      address: String(customer.address).trim()
    },
    note: String(note || '').trim(),
    deliveryLocation: deliveryLocation === 'outside' ? 'outside' : 'inside',
    items: cleanItems,
    subtotal: Number(subtotal) || 0,
    discount: Number(discount) || 0,
    deliveryFee: Number(deliveryFee) || 0,
    total: Number(total) || 0
  };

  createOrder(order);
  res.status(201).json({ order });
});

app.use(express.static(root, { index: 'index.html' }));
app.get('/admin', (req, res) => res.sendFile(path.join(root, 'admin', 'index.html')));

app.listen(PORT, () => {
  console.log(`Barakah Agro running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
