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
  deleteOrder,
  createUser,
  findUserByPhone,
    findUserByEmail,
  findUserById,
  getCartByUserId,
  saveCartForUser,
  createSession,
  getSessionUserId,
  deleteSession,
  getUserProfile,
  updateUserProfile,
  addChatMessage,
  getChatMessages,
  markChatReadByAdmin,
  getChatThreads
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

async function loadCustomerFromToken(req) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const userId = await getSessionUserId(token);
  if (!userId) return null;
  const user = await getUserProfile(userId);
  if (!user) return null;
  return {
    userId: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    district: user.district,
    address: user.address,
    createdAt: user.createdAt
  };
}

async function customerAuth(req, res, next) {
  try {
    const customer = await loadCustomerFromToken(req);
    if (!customer) return res.status(401).json({ error: 'অনুগ্রহ করে লগইন করুন।' });
    req.customer = customer;
    next();
  } catch (error) {
    console.error('customerAuth error:', error);
    res.status(500).json({ error: 'সার্ভারে সমস্যা হয়েছে।' });
  }
}

async function optionalCustomerAuth(req, res, next) {
  try {
    const customer = await loadCustomerFromToken(req);
    if (customer) req.customer = customer;
  } catch (error) {
    console.error('optionalCustomerAuth error:', error);
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
    await createSession(token, sessionData.userId);

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
    await createSession(token, sessionData.userId);

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

app.post('/api/user/logout', customerAuth, async (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) await deleteSession(token);
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

// --- Saved cart (one per logged-in customer) ---
app.get('/api/user/cart', customerAuth, async (req, res) => {
  try {
    const items = await getCartByUserId(req.customer.userId);
    res.json({ items });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'কার্ট লোড করা যায়নি।' });
  }
});

app.put('/api/user/cart', customerAuth, async (req, res) => {
  try {
    const raw = Array.isArray(req.body?.items) ? req.body.items.slice(0, 50) : [];
    const items = raw
      .map(item => ({
        productId: String(item.productId ?? ''),
        packageId: String(item.packageId ?? ''),
        name: String(item.name ?? ''),
        banglaName: String(item.banglaName ?? ''),
        packageLabel: String(item.packageLabel ?? ''),
        price: Number(item.price) || 0,
        image: String(item.image ?? ''),
        quantity: Math.min(99, Math.max(1, Number(item.quantity) || 1))
      }))
      .filter(item => item.productId);
    await saveCartForUser(req.customer.userId, items);
    res.json({ items });
  } catch (error) {
    console.error('Save cart error:', error);
    res.status(500).json({ error: 'কার্ট সেভ করা যায়নি।' });
  }
});

// --- Customer profile ---
app.put('/api/user/profile', customerAuth, async (req, res) => {
  try {
    const { name, email, district, address } = req.body || {};
    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    if (cleanName.length < 2) {
      return res.status(400).json({ error: 'সঠিক পূর্ণ নাম প্রদান করুন।' });
    }
    if (cleanEmail) {
      const existing = await findUserByEmail(cleanEmail);
      if (existing && existing.id !== req.customer.userId) {
        return res.status(409).json({ error: 'এই ইমেইল ঠিকানাটি ইতোমধ্যে ব্যবহৃত হয়েছে।' });
      }
    }
    const user = await updateUserProfile(req.customer.userId, {
      name: cleanName,
      email: cleanEmail,
      district,
      address
    });
    res.json({
      user: {
        userId: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        district: user.district,
        address: user.address,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'প্রোফাইল আপডেট করা যায়নি।' });
  }
});

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

app.delete('/api/admin/orders/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await deleteOrder(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ error: 'Failed to delete order.' });
  }
});

// --------------------------------------------------------------------------
// CHAT (customer <-> admin)
// --------------------------------------------------------------------------
const chatRate = new Map();
function chatRateOk(userId) {
  const now = Date.now();
  const list = (chatRate.get(userId) || []).filter(t => now - t < 10 * 60 * 1000);
  if (list.length >= 20) { chatRate.set(userId, list); return false; }
  list.push(now);
  chatRate.set(userId, list);
  return true;
}

// Sends a notification to the owner's phone through a Telegram bot
async function notifyOwner(text) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    });
  } catch (error) {
    console.error('Telegram notify failed:', error.message);
  }
}

app.get('/api/user/chat', customerAuth, async (req, res) => {
  try {
    const after = Number(req.query.after) || 0;
    const messages = await getChatMessages(req.customer.userId, after);
    res.json({ messages });
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ error: 'মেসেজ লোড করা যায়নি।' });
  }
});

app.post('/api/user/chat', customerAuth, async (req, res) => {
  try {
    const text = String(req.body?.text || '').trim().slice(0, 1000);
    if (!text) return res.status(400).json({ error: 'মেসেজ লিখুন।' });
    if (!chatRateOk(req.customer.userId)) {
      return res.status(429).json({ error: 'অনেক বেশি মেসেজ পাঠানো হয়েছে, একটু পরে চেষ্টা করুন।' });
    }
    const message = await addChatMessage(req.customer.userId, 'customer', text);
    const base = process.env.APP_URL || '';
    notifyOwner(`💬 নতুন মেসেজ\n👤 ${req.customer.name} (${req.customer.phone})\n\n${text}\n\n👉 ${base}/admin`);
    res.status(201).json({ message });
  } catch (error) {
    console.error('Send chat error:', error);
    res.status(500).json({ error: 'মেসেজ পাঠানো যায়নি।' });
  }
});

app.get('/api/admin/chat', adminAuth, async (req, res) => {
  try {
    const threads = await getChatThreads();
    res.json({ threads });
  } catch (error) {
    console.error('Admin chat threads error:', error);
    res.status(500).json({ error: 'Failed to load chats.' });
  }
});

app.get('/api/admin/chat/:userId', adminAuth, async (req, res) => {
  try {
    const after = Number(req.query.after) || 0;
    const messages = await getChatMessages(req.params.userId, after);
    await markChatReadByAdmin(req.params.userId);
    res.json({ messages });
  } catch (error) {
    console.error('Admin chat load error:', error);
    res.status(500).json({ error: 'Failed to load messages.' });
  }
});

app.post('/api/admin/chat/:userId', adminAuth, async (req, res) => {
  try {
    const text = String(req.body?.text || '').trim().slice(0, 1000);
    if (!text) return res.status(400).json({ error: 'Message is empty.' });
    const user = await findUserById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'Customer not found.' });
    const message = await addChatMessage(req.params.userId, 'admin', text);
    res.status(201).json({ message });
  } catch (error) {
    console.error('Admin chat send error:', error);
    res.status(500).json({ error: 'Failed to send message.' });
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
    userId: req.customer ? req.customer.userId : null,
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
    
    // First order: remember the delivery details in the customer's account
    if (req.customer && (!req.customer.district || !req.customer.address)) {
      try {
        await updateUserProfile(req.customer.userId, {
          name: req.customer.name,
          email: req.customer.email,
          district: req.customer.district || order.customer.district,
          address: req.customer.address || order.customer.address
        });
      } catch (e) {
        console.error('Auto-save profile failed:', e);
      }
    }
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
