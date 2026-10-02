import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initDb,
  createOrder,
  getOrders,
  getOrdersByUserId,
  updateOrderStatus,
  createUser,
  findUserByPhone,
  findUserByEmail,
  findUserById
} from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const app = express();
const PORT = Number(process.env.PORT || 3000);
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const adminSessions = new Set();
const customerSessions = new Map();
const allowedStatuses = ['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'];

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Password hashing helper (PBKDF2 SHA-512)
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token || !adminSessions.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function customerAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token || !customerSessions.has(token)) {
    return res.status(401).json({ error: 'অনুগ্রহ করে লগইন করুন।' });
  }
  req.customer = customerSessions.get(token);
  next();
}

function optionalCustomerAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token && customerSessions.has(token)) {
    req.customer = customerSessions.get(token);
  }
  next();
}

function makeOrderId() {
  return `BA-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

function makeUserId() {
  return `USR-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}

// --------------------------------------------------------------------------
// CUSTOMER AUTHENTICATION ENDPOINTS
// --------------------------------------------------------------------------
app.post('/api/user/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body || {};
    const trimmedName = String(name || '').trim();
    const trimmedPhone = String(phone || '').trim();
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const trimmedPass = String(password || '');

    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({ error: 'সঠিক পূর্ণ নাম প্রদান করুন।' });
    }
    if (!trimmedPhone || trimmedPhone.length < 11) {
      return res.status(400).json({ error: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।' });
    }
    if (!trimmedPass || trimmedPass.length < 6) {
      return res.status(400).json({ error: 'পাসওয়ার্ড সর্বনিম্ন ৬ অক্ষরের হতে হবে।' });
    }

    // Check existing phone
    const existingPhone = await findUserByPhone(trimmedPhone);
    if (existingPhone) {
      return res.status(409).json({ error: 'এই মোবাইল নম্বর দিয়ে ইতোমধ্যে অ্যাকাউন্ট রয়েছে। দয়া করে লগইন করুন।' });
    }

    // Check existing email if provided
    if (trimmedEmail) {
      const existingEmail = await findUserByEmail(trimmedEmail);
      if (existingEmail) {
        return res.status(409).json({ error: 'এই ইমেইল ঠিকানাটি ইতোমধ্যে ব্যবহৃত হয়েছে।' });
      }
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(trimmedPass, salt);
    const userId = makeUserId();

    const newUser = await createUser({
      id: userId,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail || null,
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const token = crypto.randomBytes(32).toString('hex');
    const sessionData = {
      userId: newUser.id,
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      createdAt: newUser.createdAt
    };
    customerSessions.set(token, sessionData);

    res.status(201).json({
      token,
      user: sessionData
    });
  } catch (error) {
    console.error('Customer register error:', error);
    res.status(500).json({ error: 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।' });
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    const { identifier, password } = req.body || {};
    const trimmedIdent = String(identifier || '').trim();
    const trimmedPass = String(password || '');

    if (!trimmedIdent || !trimmedPass) {
      return res.status(400).json({ error: 'মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড আবশ্যক।' });
    }

    // Try finding by phone or email
    let user = await findUserByPhone(trimmedIdent);
    if (!user && trimmedIdent.includes('@')) {
      user = await findUserByEmail(trimmedIdent);
    }

    if (!user) {
      return res.status(401).json({ error: 'ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড।' });
    }

    const computedHash = hashPassword(trimmedPass, user.salt);
    if (computedHash !== user.passwordHash) {
      return res.status(401).json({ error: 'ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড।' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const sessionData = {
      userId: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt
    };
    customerSessions.set(token, sessionData);

    res.json({
      token,
      user: sessionData
    });
  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ error: 'লগইন প্রক্রিয়ায় ত্রুটি হয়েছে।' });
  }
});

app.get('/api/user/me', customerAuth, (req, res) => {
  res.json({ user: req.customer });
});

app.post('/api/user/logout', customerAuth, (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) customerSessions.delete(token);
  res.json({ ok: true });
});

app.get('/api/user/orders', customerAuth, async (req, res) => {
  try {
    const orders = await getOrdersByUserId(req.customer.userId);
    res.json({ orders });
  } catch (error) {
    console.error('Customer getOrders error:', error);
    res.status(500).json({ error: 'অর্ডার তালিকা লোড করা যায়নি।' });
  }
});

// --------------------------------------------------------------------------
// ADMIN AUTHENTICATION & MANAGEMENT
// --------------------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  if (!ADMIN_PASSWORD) return res.status(503).json({ error: 'Admin password is not configured. Set ADMIN_PASSWORD in .env.' });
  const { username, password } = req.body || {};
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'ভুল username অথবা password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  adminSessions.add(token);
  res.json({ token });
});

app.post('/api/admin/logout', adminAuth, (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) adminSessions.delete(token);
  res.json({ ok: true });
});

app.get('/api/admin/orders', adminAuth, async (req, res) => {
  try {
    const orders = await getOrders();
    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to load orders.' });
  }
});

app.patch('/api/admin/orders/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body || {};

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await updateOrderStatus(req.params.id, status);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// --------------------------------------------------------------------------
// ORDERS SUBMISSION (SUPPORTS AUTHENTICATED OR GUEST CHECKOUT)
// --------------------------------------------------------------------------
app.post('/api/orders', optionalCustomerAuth, async (req, res) => {
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
    userId: req.customer ? req.customer.userId : (body.userId || null),
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

  try {
    await createOrder(order);
    res.status(201).json({ order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});
app.use(express.static(root, { index: 'index.html' }));
app.get('/admin', (req, res) => res.sendFile(path.join(root, 'admin', 'index.html')));
async function startServer() {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`Barakah Agro running at http://localhost:${PORT}`);
      console.log(`Admin panel: http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
