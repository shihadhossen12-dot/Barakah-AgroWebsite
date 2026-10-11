import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import crypto from 'crypto';
import {defineConfig, Plugin} from 'vite';
import {
  initDb,
  createOrder,
  getOrders,
  getOrdersByUserId,
  updateOrderStatus,
  createUser,
  findUserByPhone,
  findUserByEmail,
  findUserById,
  getManagedProducts,
  saveManagedProduct,
  removeManagedProduct,
  addContactMessage,
  getContactMessages
} from './server/db.js';

function apiPlugin(): Plugin {
  const adminSessions = new Set<string>();
  const customerSessions = new Map<string, any>();
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'barakah123';

  // Initialize DB asynchronously
  initDb().catch(console.error);

  function makeOrderId() {
    return `BA-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
  }

  function makeUserId() {
    return `USR-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  }

  function hashPassword(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }

  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api')) {
          return next();
        }

        // Helper to read JSON body
        const readBody = async (): Promise<any> => {
          return new Promise((resolve) => {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch {
                resolve({});
              }
            });
          });
        };

        const json = (status: number, data: any) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        if (url === '/api/health' && req.method === 'GET') {
          return json(200, { ok: true });
        }

        // --------------------------------------------------------------------
        // CUSTOMER AUTHENTICATION ENDPOINTS
        // --------------------------------------------------------------------
        if (url === '/api/user/register' && req.method === 'POST') {
          const body = await readBody();
          const { name, phone, email, password } = body || {};
          const trimmedName = String(name || '').trim();
          const trimmedPhone = String(phone || '').trim();
          const trimmedEmail = String(email || '').trim().toLowerCase();
          const trimmedPass = String(password || '');

          if (!trimmedName || trimmedName.length < 2) {
            return json(400, { error: 'সঠিক পূর্ণ নাম প্রদান করুন।' });
          }
          if (!trimmedPhone || trimmedPhone.length < 11) {
            return json(400, { error: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।' });
          }
          if (!trimmedPass || trimmedPass.length < 6) {
            return json(400, { error: 'পাসওয়ার্ড সর্বনিম্ন ৬ অক্ষরের হতে হবে।' });
          }

          const existingPhone = await findUserByPhone(trimmedPhone);
          if (existingPhone) {
            return json(409, { error: 'এই মোবাইল নম্বর দিয়ে ইতোমধ্যে অ্যাকাউন্ট রয়েছে। দয়া করে লগইন করুন।' });
          }

          if (trimmedEmail) {
            const existingEmail = await findUserByEmail(trimmedEmail);
            if (existingEmail) {
              return json(409, { error: 'এই ইমেইল ঠিকানাটি ইতোমধ্যে ব্যবহৃত হয়েছে।' });
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

          return json(201, {
            token,
            user: sessionData
          });
        }

        if (url === '/api/user/login' && req.method === 'POST') {
          const body = await readBody();
          const { identifier, password } = body || {};
          const trimmedIdent = String(identifier || '').trim();
          const trimmedPass = String(password || '');

          if (!trimmedIdent || !trimmedPass) {
            return json(400, { error: 'মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড আবশ্যক।' });
          }

          let user = await findUserByPhone(trimmedIdent);
          if (!user && trimmedIdent.includes('@')) {
            user = await findUserByEmail(trimmedIdent);
          }

          if (!user) {
            return json(401, { error: 'ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড।' });
          }

          const computedHash = hashPassword(trimmedPass, user.salt);
          if (computedHash !== user.passwordHash) {
            return json(401, { error: 'ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড।' });
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

          return json(200, {
            token,
            user: sessionData
          });
        }

        if (url === '/api/user/me' && req.method === 'GET') {
          const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!token || !customerSessions.has(token)) {
            return json(401, { error: 'Unauthorized' });
          }
          return json(200, { user: customerSessions.get(token) });
        }

        if (url === '/api/user/logout' && req.method === 'POST') {
          const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (token) customerSessions.delete(token);
          return json(200, { ok: true });
        }

        if (url === '/api/user/orders' && req.method === 'GET') {
          const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!token || !customerSessions.has(token)) {
            return json(401, { error: 'Unauthorized' });
          }
          const session = customerSessions.get(token);
          try {
            const orders = await getOrdersByUserId(session.userId);
            return json(200, { orders });
          } catch {
            return json(500, { error: 'অর্ডার তালিকা লোড করা যায়নি।' });
          }
        }

        // --------------------------------------------------------------------
        // ADMIN ENDPOINTS
        // --------------------------------------------------------------------
        if (url === '/api/coupons/validate' && req.method === 'POST') {
          const body = await readBody();
          const configured = String(process.env.PRIVATE_COUPON_CODE || '').trim().toUpperCase();
          const percent = Number(process.env.PRIVATE_COUPON_PERCENT);
          if (!configured || !Number.isFinite(percent) || percent <= 0 || percent >= 100) return json(503, { error: 'Coupon service is unavailable.' });
          if (String(body.code || '').trim().toUpperCase() !== configured) return json(400, { error: 'Invalid coupon.' });
          return json(200, { coupon: { type: 'percent', value: percent, minSpend: 0 } });
        }
        if (url === '/api/contact-messages' && req.method === 'POST') {
          const b = await readBody();
          const name = String(b.name || '').trim().slice(0, 120);
          const phone = String(b.phone || '').trim().slice(0, 40);
          const subject = String(b.subject || '').trim().slice(0, 160);
          const message = String(b.message || '').trim().slice(0, 3000);
          if (name.length < 2 || phone.length < 6 || message.length < 2) return json(400, { error: 'নাম, ফোন ও বার্তা ঠিকভাবে পূরণ করুন।' });
          try { const saved = await addContactMessage({ name, phone, subject, message }); return json(201, { ok: true, id: saved.id }); }
          catch { return json(500, { error: 'বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।' }); }
        }
        if (url.startsWith('/api/admin/contact-messages') && req.method === 'GET') {
          const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!auth || !adminSessions.has(auth)) return json(401, { error: 'Unauthorized' });
          try { return json(200, await getContactMessages(url.includes('read=1'))); }
          catch { return json(500, { error: 'বার্তা লোড করা যায়নি।' }); }
        }
        if (url === '/api/products' && req.method === 'GET') {
          try { return json(200, await getManagedProducts()); }
          catch { return json(500, { error: 'Failed to load products.' }); }
        }
        if (url === '/api/admin/products' && req.method === 'POST') {
          const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!auth || !adminSessions.has(auth)) return json(401, { error: 'Unauthorized' });
          const b = await readBody();
          const name = String(b.name || '').trim();
          const price = Number(b.price);
          if (name.length < 2 || !Number.isFinite(price) || price < 0) return json(400, { error: 'নাম ও সঠিক দাম দিন।' });
          const id = 'admin-' + crypto.randomBytes(6).toString('hex');
          const category = String(b.category || 'other').trim().slice(0, 60);
          const image = String(b.image || 'images/products/default.png').trim();
          const oldPrice = Number(b.oldPrice) || 0;
          const stock = Math.max(0, Number(b.stock) || 0);
          const product = { id, name, banglaName: String(b.banglaName || name).trim(), category, categoryName: category, sku: String(b.sku || id).trim(), price, oldPrice, stock, image, images: [image], shortDescription: String(b.description || '').trim(), description: String(b.description || '').trim(), rating: 0, reviewCount: 0, packages: [{ id: id + '-default', label: '১ পিস', price, oldPrice, stock }] };
          try { await saveManagedProduct(product); return json(201, { product }); }
          catch { return json(500, { error: 'পণ্য যোগ করা যায়নি।' }); }
        }
        const managedProductMatch = url.match(/^\/api\/admin\/products\/([^/?]+)$/);
        if (managedProductMatch && req.method === 'DELETE') {
          const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!auth || !adminSessions.has(auth)) return json(401, { error: 'Unauthorized' });
          try { await removeManagedProduct(decodeURIComponent(managedProductMatch[1])); return json(200, { ok: true }); }
          catch { return json(500, { error: 'পণ্য মুছতে সমস্যা হয়েছে।' }); }
        }
        if (url === '/api/admin/login' && req.method === 'POST') {
          const body = await readBody();
          const { username, password } = body;
          if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
            return json(401, { error: 'ভুল username অথবা password' });
          }
          const token = crypto.randomBytes(32).toString('hex');
          adminSessions.add(token);
          return json(200, { token });
        }

        if (url === '/api/admin/logout' && req.method === 'POST') {
          const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (auth) adminSessions.delete(auth);
          return json(200, { ok: true });
        }

        if (url === '/api/admin/orders' && req.method === 'GET') {
          const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!auth || !adminSessions.has(auth)) {
            return json(401, { error: 'Unauthorized' });
          }
          try {
            const orders = await getOrders();
            return json(200, { orders });
          } catch {
            return json(500, { error: 'Failed to load orders.' });
          }
        }

        const statusMatch = url.match(/^\/api\/admin\/orders\/([^/]+)\/status$/);
        if (statusMatch && req.method === 'PATCH') {
          const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          if (!auth || !adminSessions.has(auth)) {
            return json(401, { error: 'Unauthorized' });
          }
          const orderId = decodeURIComponent(statusMatch[1]);
          const body = await readBody();
          try {
            const updated = await updateOrderStatus(orderId, body.status);
            return json(200, { order: updated });
          } catch {
            return json(500, { error: 'Failed to update order status.' });
          }
        }

        // --------------------------------------------------------------------
        // ORDERS SUBMISSION
        // --------------------------------------------------------------------
        if (url === '/api/orders' && req.method === 'POST') {
          const body = await readBody();
          const { customer, items, deliveryLocation, deliveryFee, couponCode, paymentMethod, note } = body;
          if (!customer?.name || !customer?.phone || !customer?.district || !customer?.address) {
            return json(400, { error: 'Customer information is incomplete.' });
          }
          if (!Array.isArray(items) || items.length === 0) {
            return json(400, { error: 'Cart is empty.' });
          }

          const customerAuthToken = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
          const customerSession = customerAuthToken ? customerSessions.get(customerAuthToken) : null;

          const cleanItems = items.map((item: any) => ({
            id: String(item.id ?? ''),
            name: String(item.banglaName ?? item.name ?? ''),
            packageLabel: String(item.packageLabel ?? ''),
            price: Number(item.price) || 0,
            quantity: Math.max(1, Number(item.quantity) || 1),
            image: String(item.image ?? '')
          }));

          const normalizedCoupon = String(couponCode || '').trim().toUpperCase();
          const privateCode = String(process.env.PRIVATE_COUPON_CODE || '').trim().toUpperCase();
          const privatePercent = Number(process.env.PRIVATE_COUPON_PERCENT);
          const couponRules: Record<string, number> = { TURAB: 5 };
          if (privateCode && Number.isFinite(privatePercent) && privatePercent > 0 && privatePercent < 100) couponRules[privateCode] = privatePercent;
          if (normalizedCoupon && !Object.prototype.hasOwnProperty.call(couponRules, normalizedCoupon)) return json(400, { error: 'Invalid coupon.' });
          const orderSubtotal = cleanItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
          const orderDiscount = normalizedCoupon ? Math.round(orderSubtotal * couponRules[normalizedCoupon] / 100) : 0;
          const orderDeliveryFee = Math.max(0, Number(deliveryFee) || 0);

          const order = {
            id: makeOrderId(),
            userId: customerSession ? customerSession.userId : (body.userId || null),
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
            subtotal: orderSubtotal,
            discount: orderDiscount,
            deliveryFee: orderDeliveryFee,
            total: Math.max(0, orderSubtotal - orderDiscount + orderDeliveryFee)
          };

          try {
            await createOrder(order);
            return json(201, { order });
          } catch (err) {
            console.error('Create order error in Vite middleware:', err);
            return json(500, { error: 'Failed to create order.' });
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

