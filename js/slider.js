/* ==========================================================================
   BARAKAH AGRO - Home page auto sliders (js/slider.js)
   - ক্যাটাগরি, পণ্য ও রিভিউ নিজে নিজে স্লাইড হবে
   - মাউস রাখলে বা আঙুল দিয়ে ধরলে থামবে, ছাড়লে আবার চলবে
   - ডেস্কটপে মাউস দিয়ে টেনেও সরানো যাবে
   ========================================================================== */
(function () {
  // দিক বদলাতে চাইলে শুধু এই তিনটা শব্দ বদলান: 'left' অথবা 'right'
  var CATEGORY_DIR = 'left';   // ক্যাটাগরি কার্ড
  var PRODUCT_DIR  = 'right';  // পণ্যের স্লাইডার
  var REVIEW_DIR   = 'right';  // রিভিউ

  // গতি (পিক্সেল প্রতি সেকেন্ড): বেশি সংখ্যা = দ্রুত
  var CATEGORY_SPEED = 35;
  var PRODUCT_SPEED  = 40;
  var REVIEW_SPEED   = 45;

  var TARGETS = [
    { id: 'featuredCategoriesGrid', dir: CATEGORY_DIR, speed: CATEGORY_SPEED },
    { id: 'bestSellingCarousel',    dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'mustardOilCarousel',     dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'milkCarousel',           dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'meatCarousel',           dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'leavesCarousel',         dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'superfoodsCarousel',     dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'fruitsCarousel',         dir: PRODUCT_DIR,  speed: PRODUCT_SPEED },
    { id: 'customerReviewsCarousel', dir: REVIEW_DIR,  speed: REVIEW_SPEED }
  ];

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setup(track, dir, speed) {
    if (track.dataset.slider) return;
    track.dataset.slider = '1';

    // snap চালু থাকলে নিজে নিজে স্লাইড আটকে যায়, তাই বন্ধ রাখা হলো
    track.style.setProperty('scroll-snap-type', 'none', 'important');

    var sign = dir === 'right' ? -1 : 1;   // right = কার্ড ডান দিকে সরবে
    var hover = false, touch = false, visible = true, touchTimer = null;
    var pos = null, last = 0, holdUntil = 0, rewindAt = 0, rewindTo = 0;

    function maxScroll() { return track.scrollWidth - track.clientWidth; }

    if (sign < 0 && maxScroll() > 0) track.scrollLeft = maxScroll();

    // ---- থামা ও চলা ----
    track.addEventListener('mouseenter', function () { hover = true; });
    track.addEventListener('mouseleave', function () { hover = false; });
    track.addEventListener('touchstart', function () { touch = true; clearTimeout(touchTimer); }, { passive: true });
    ['touchend', 'touchcancel'].forEach(function (ev) {
      track.addEventListener(ev, function () {
        clearTimeout(touchTimer);
        touchTimer = setTimeout(function () { touch = false; }, 2500);
      }, { passive: true });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(track);
    }

    // ---- ডেস্কটপে মাউস দিয়ে টেনে সরানো ----
    var down = false, moved = false, startX = 0, startLeft = 0;
    track.addEventListener('mousedown', function (e) {
      down = true; moved = false; startX = e.pageX; startLeft = track.scrollLeft;
    });
    window.addEventListener('mousemove', function (e) {
      if (!down) return;
      var dx = e.pageX - startX;
      if (Math.abs(dx) > 5) moved = true;
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('mouseup', function () { down = false; });
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    if (reduceMotion) return;

    // ---- নিজে নিজে স্লাইড ----
    function tick(ts) {
      var dt = last ? Math.min(ts - last, 50) / 1000 : 0;
      last = ts;
      var m = maxScroll();
      var paused = hover || touch || down || !visible || document.hidden;

      if (!paused && m > 2) {
        if (rewindAt && ts >= rewindAt) {
          track.scrollTo({ left: rewindTo, behavior: 'smooth' });
          rewindAt = 0;
        }
        if (ts >= holdUntil) {
          if (pos === null || Math.abs(pos - track.scrollLeft) > 1.5) pos = track.scrollLeft;
          pos += sign * speed * dt;
          if ((sign > 0 && pos >= m) || (sign < 0 && pos <= 0)) {
            // শেষ মাথায় পৌঁছালে একটু থেমে মসৃণভাবে শুরুতে ফিরবে
            pos = Math.min(Math.max(pos, 0), m);
            track.scrollLeft = pos;
            rewindTo = sign > 0 ? 0 : m;
            rewindAt = ts + 1200;
            holdUntil = ts + 2800;
            pos = null;
          } else {
            track.scrollLeft = pos;
          }
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function boot() {
    TARGETS.forEach(function (t) {
      var el = document.getElementById(t.id);
      if (el && el.children.length) setup(el, t.dir, t.speed);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    boot();
    setTimeout(boot, 400);
    setTimeout(boot, 1200);
    setTimeout(boot, 3000);
  });
  if (document.readyState !== 'loading') {
    boot();
    setTimeout(boot, 400);
    setTimeout(boot, 1200);
    setTimeout(boot, 3000);
  }
})();