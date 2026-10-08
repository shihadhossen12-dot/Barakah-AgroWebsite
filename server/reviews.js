// ==========================================================================
// PRODUCT REVIEWS — সার্ভারে সংরক্ষিত, সব ভিজিটর দেখতে পায়
// লিখতে পারবে শুধু লগইন করা ক্রেতা; মুছতে পারবে শুধু অ্যাডমিন
// ==========================================================================
import crypto from 'crypto';
import { getDbHandle } from './db.js';

const inMemoryReviews = [];
let tableReady = null;

async function ensureTable(pool) {
  if (!tableReady) {
    tableReady = pool
      .query(`
        CREATE TABLE IF NOT EXISTS reviews (
          id TEXT PRIMARY KEY,
          product_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          location TEXT,
          rating INTEGER NOT NULL,
          text TEXT NOT NULL,
          image TEXT,
          verified BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL
        );
        CREATE UNIQUE INDEX IF NOT EXISTS reviews_product_user_idx ON reviews (product_id, user_id);
        CREATE INDEX IF NOT EXISTS reviews_product_idx ON reviews (product_id, created_at DESC);
      `)
      .catch((err) => {
        tableReady = null;
        throw err;
      });
  }
  await tableReady;
}

const COLS = `id, product_id AS "productId", user_id AS "userId", name, location, rating, text,
  (image IS NOT NULL AND image <> '') AS "hasImage", verified, created_at AS "createdAt"`;

function stripImage({ image, ...rest }) {
  return { ...rest, hasImage: !!image };
}

// দ্রষ্টব্য: রিভিউয়ের ডাটাবেস ত্রুটি হলে শুধু রিভিউ ফিচার এরর দেবে,
// পুরো সাইট (অর্ডার ইত্যাদি) in-memory মোডে চলে যাবে না।
async function addReview(r) {
  const { pool } = getDbHandle();
  if (pool) {
    await ensureTable(pool);
    await pool.query(
      `INSERT INTO reviews (id, product_id, user_id, name, location, rating, text, image, verified, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [r.id, r.productId, r.userId, r.name, r.location, r.rating, r.text, r.image || null, r.verified, r.createdAt]
    );
    return r;
  }
  if (inMemoryReviews.some((x) => x.productId === r.productId && x.userId === r.userId)) {
    const dup = new Error('duplicate');
    dup.code = '23505';
    throw dup;
  }
  inMemoryReviews.unshift(r);
  return r;
}

async function getReviewsByProduct(productId) {
  const { pool } = getDbHandle();
  if (pool) {
    await ensureTable(pool);
    const res = await pool.query(
      `SELECT ${COLS} FROM reviews WHERE product_id = $1 ORDER BY created_at DESC LIMIT 200`,
      [String(productId)]
    );
    return res.rows;
  }
  return inMemoryReviews.filter((r) => r.productId === String(productId)).slice(0, 200).map(stripImage);
}

async function getAllReviews() {
  const { pool } = getDbHandle();
  if (pool) {
    await ensureTable(pool);
    const res = await pool.query(`SELECT ${COLS} FROM reviews ORDER BY created_at DESC LIMIT 500`);
    return res.rows;
  }
  return inMemoryReviews.slice(0, 500).map(stripImage);
}

async function getReviewImage(id) {
  const { pool } = getDbHandle();
  if (pool) {
    await ensureTable(pool);
    const res = await pool.query(`SELECT image FROM reviews WHERE id = $1`, [String(id)]);
    return res.rows[0]?.image || null;
  }
  return inMemoryReviews.find((r) => r.id === String(id))?.image || null;
}

async function deleteReview(id) {
  const { pool } = getDbHandle();
  if (pool) {
    await ensureTable(pool);
    const res = await pool.query(`DELETE FROM reviews WHERE id = $1`, [String(id)]);
    return res.rowCount > 0;
  }
  const i = inMemoryReviews.findIndex((r) => r.id === String(id));
  if (i === -1) return false;
  inMemoryReviews.splice(i, 1);
  return true;
}

// ---- সীমা: এক ক্রেতা ঘণ্টায় সর্বোচ্চ ১০টি রিভিউ ----
const reviewRate = new Map();
function reviewRateOk(key) {
  const now = Date.now();
  const list = (reviewRate.get(key) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (list.length >= 10) {
    reviewRate.set(key, list);
    return false;
  }
  list.push(now);
  reviewRate.set(key, list);
  return true;
}

const IMAGE_RE = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+=*)$/;

function publicReview(r) {
  return {
    id: r.id,
    productId: r.productId,
    name: r.name,
    location: r.location || '',
    rating: r.rating,
    text: r.text,
    image: r.hasImage ? `/api/review-image/${encodeURIComponent(r.id)}` : null,
    verified: !!r.verified,
    createdAt: r.createdAt
  };
}

export function registerReviewRoutes(app, { customerAuth, adminAuth, getOrdersByUserId }) {
  // সবাই দেখতে পাবে
  app.get('/api/reviews/:productId', async (req, res) => {
    const productId = String(req.params.productId || '');
    if (!/^\d{1,6}$/.test(productId)) return res.status(400).json({ error: 'Invalid product.' });
    try {
      const rows = await getReviewsByProduct(productId);
      res.json({ reviews: rows.map(publicReview) });
    } catch (error) {
      console.error('Get reviews error:', error);
      res.status(500).json({ error: 'রিভিউ লোড করা যায়নি।' });
    }
  });

  // রিভিউয়ের ছবি
  app.get('/api/review-image/:id', async (req, res) => {
    try {
      const data = await getReviewImage(req.params.id);
      const m = data ? IMAGE_RE.exec(data) : null;
      if (!m) return res.status(404).end();
      res.set({
        'Content-Type': m[1],
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=86400'
      });
      res.send(Buffer.from(m[2], 'base64'));
    } catch (error) {
      res.status(500).end();
    }
  });

  // শুধু লগইন করা ক্রেতা রিভিউ দিতে পারবে
  app.post('/api/reviews', customerAuth, async (req, res) => {
    const body = req.body || {};
    const productId = String(body.productId ?? '');
    const name = String(body.name ?? '').trim();
    const location = String(body.location ?? '').trim();
    const text = String(body.text ?? '').trim();
    const rating = Math.round(Number(body.rating));
    const image = body.image ? String(body.image) : null;

    if (!/^\d{1,6}$/.test(productId)) return res.status(400).json({ error: 'Invalid product.' });
    if (!name || name.length > 60) return res.status(400).json({ error: 'দয়া করে আপনার নাম লিখুন (সর্বোচ্চ ৬০ অক্ষর)।' });
    if (!location || location.length > 80) return res.status(400).json({ error: 'দয়া করে ঠিকানা/শহর লিখুন।' });
    if (text.length < 3 || text.length > 1000) return res.status(400).json({ error: 'রিভিউ ৩ থেকে ১০০০ অক্ষরের মধ্যে লিখুন।' });
    if (!(rating >= 1 && rating <= 5)) return res.status(400).json({ error: 'রেটিং ১ থেকে ৫ এর মধ্যে দিন।' });
    if (image && (image.length > 600000 || !IMAGE_RE.test(image))) {
      return res.status(400).json({ error: 'ছবিটি সঠিক নয় বা অনেক বড়। ছোট JPG/PNG/WebP ছবি দিন।' });
    }
    if (!reviewRateOk(req.customer.userId)) {
      return res.status(429).json({ error: 'অনেক বেশি রিভিউ দেওয়া হয়েছে। কিছুক্ষণ পরে চেষ্টা করুন।' });
    }

    try {
      // "ভেরিফাইড ক্রয়" চিহ্ন: শুধু যদি এই ক্রেতার ডেলিভারড অর্ডারে এই পণ্য থাকে
      const orders = await getOrdersByUserId(req.customer.userId);
      const verified = orders.some(
        (o) => o.status === 'delivered' && Array.isArray(o.items) && o.items.some((i) => String(i.id) === productId)
      );

      const review = await addReview({
        id: 'REV-' + crypto.randomBytes(6).toString('hex').toUpperCase(),
        productId,
        userId: req.customer.userId,
        name,
        location,
        rating,
        text,
        image,
        verified,
        createdAt: new Date().toISOString()
      });
      res.status(201).json({ review: publicReview({ ...review, hasImage: !!review.image }) });
    } catch (error) {
      if (error && error.code === '23505') {
        return res.status(409).json({ error: 'আপনি এই পণ্যের রিভিউ আগেই দিয়েছেন।' });
      }
      console.error('Create review error:', error);
      res.status(500).json({ error: 'রিভিউ সংরক্ষণ করা যায়নি।' });
    }
  });

  // অ্যাডমিন: সব রিভিউ দেখা ও মুছে ফেলা
  app.get('/api/admin/reviews', adminAuth, async (req, res) => {
    try {
      const rows = await getAllReviews();
      res.json({ reviews: rows.map((r) => ({ ...publicReview(r), userId: r.userId })) });
    } catch (error) {
      console.error('Admin get reviews error:', error);
      res.status(500).json({ error: 'Failed to load reviews.' });
    }
  });

  app.delete('/api/admin/reviews/:id', adminAuth, async (req, res) => {
    try {
      const ok = await deleteReview(req.params.id);
      if (!ok) return res.status(404).json({ error: 'Review not found' });
      res.json({ ok: true });
    } catch (error) {
      console.error('Delete review error:', error);
      res.status(500).json({ error: 'Failed to delete review.' });
    }
  });
}