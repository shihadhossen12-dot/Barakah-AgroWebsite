/* ==========================================================================
   BARAKAH AGRO - META (FACEBOOK) PIXEL  (js/meta-pixel.js)
   এই ফাইলটি প্রতিটি পেজের <head>-এ লোড হবে।
   ========================================================================== */

(function () {
  // ▼▼▼ শুধু এই লাইনে Owner-এর দেওয়া Pixel ID বসান (উদাহরণ: "123456789012345") ▼▼▼
  var PIXEL_ID = "1662114665467591";  
  // ▲▲▲ -------------------------------------------------------------------- ▲▲▲

  var CURRENCY = "BDT";
  var enabled = PIXEL_ID && PIXEL_ID !== "YOUR_PIXEL_ID";

  // ---- Meta Pixel Base Code (Facebook-এর অফিসিয়াল কোড) ----
  if (enabled) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  // ---- Data Layer (Google Tag Manager-এর জন্য) ----
  window.dataLayer = window.dataLayer || [];
  var GA4_EVENTS = {
    ViewContent: "view_item",
    AddToCart: "add_to_cart",
    InitiateCheckout: "begin_checkout",
    Purchase: "purchase"
  };

  function pushDataLayer(eventName, params, eventId) {
    try {
      var gaName = GA4_EVENTS[eventName];
      if (!gaName) return;
      var rows = params.contents || (params.content_ids || []).map(function (id) {
        return { id: id, quantity: 1 };
      });
      var ecommerce = {
        currency: params.currency,
        value: params.value,
        items: rows.map(function (c) {
          return { item_id: String(c.id), quantity: Number(c.quantity) || 1 };
        })
      };
      if (eventName === "Purchase" && eventId) ecommerce.transaction_id = String(eventId);
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({ event: gaName, ecommerce: ecommerce });
    } catch (e) {
      console.warn("DataLayer error:", e);
    }
  }

  // ---- ছোট helper: Pixel না থাকলেও যেন সাইট না ভাঙে ----
  function safeTrack(eventName, params, eventId) {
    pushDataLayer(eventName, params || {}, eventId);
    try {
      if (!enabled || typeof window.fbq !== "function") return;
      if (eventId) {
        fbq('track', eventName, params || {}, { eventID: String(eventId) });
      } else {
        fbq('track', eventName, params || {});
      }
    } catch (e) {
      console.warn("Meta Pixel error:", e);
    }
  }

  // ---- AddToCart ----
  window.fbTrackAddToCart = function (product, pkg, quantity) {
    if (!product || !pkg) return;
    var qty = Number(quantity) || 1;
    safeTrack("AddToCart", {
      content_ids: [String(product.id)],
      content_name: product.name,
      content_type: "product",
      contents: [{ id: String(product.id), quantity: qty }],
      value: (Number(pkg.price) || 0) * qty,
      currency: CURRENCY
    });
  };

  // ---- Purchase (অর্ডার সফল হলে) ----
  // cart = কার্টের আইটেম, total = মোট টাকা, orderId = অর্ডার আইডি
  window.fbTrackPurchase = function (cart, total, orderId) {
    var items = Array.isArray(cart) ? cart : [];
    safeTrack("Purchase", {
      content_ids: items.map(function (i) { return String(i.productId); }),
      content_type: "product",
      contents: items.map(function (i) {
        return { id: String(i.productId), quantity: Number(i.quantity) || 1 };
      }),
      num_items: items.reduce(function (s, i) { return s + (Number(i.quantity) || 1); }, 0),
      value: Number(total) || 0,
      currency: CURRENCY
    }, orderId);
  };

  // ---- অটো ইভেন্ট: ViewContent (প্রোডাক্ট পেজ) ও InitiateCheckout (চেকআউট পেজ) ----
  document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname;

    // প্রোডাক্ট ডিটেইলস পেজ
    if (path.indexOf("product-details") !== -1) {
      var id = new URLSearchParams(window.location.search).get("id");
      var list = window.BARAKAH_PRODUCTS || [];
      var product = list.find(function (p) { return String(p.id) === String(id); });
      if (product && product.packages && product.packages[0]) {
        safeTrack("ViewContent", {
          content_ids: [String(product.id)],
          content_name: product.name,
          content_type: "product",
          value: Number(product.packages[0].price) || 0,
          currency: CURRENCY
        });
      }
    }

    // চেকআউট পেজ
    if (path.indexOf("checkout") !== -1 && typeof getCart === "function") {
      var cart = getCart();
      if (cart.length > 0) {
        safeTrack("InitiateCheckout", {
          content_ids: cart.map(function (i) { return String(i.productId); }),
          content_type: "product",
          num_items: cart.reduce(function (s, i) { return s + (Number(i.quantity) || 1); }, 0),
          value: cart.reduce(function (s, i) { return s + (Number(i.price) || 0) * (Number(i.quantity) || 1); }, 0),
          currency: CURRENCY
        });
      }
    }
  });
})();
