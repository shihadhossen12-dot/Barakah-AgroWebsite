/* ==========================================================================
   BARAKAH AGRO - Customer Chat Widget (js/chat.js)
   Shows a floating "চ্যাট" button on every page for logged-in customers.
   ========================================================================== */
(function () {
  if (document.getElementById("bcFab")) return;          // already on this page
  if (typeof getLoggedInCustomer !== "function") return; // script.js not loaded

  var css = [
    ".bc-fab[hidden], .bc-panel[hidden], .bc-badge[hidden] { display: none; }",
    ".bc-fab { position: fixed; right: 20px; bottom: 20px; z-index: 9000; border: 0; border-radius: 999px; padding: 14px 20px; background: var(--primary, #166534); color: #fff; font: inherit; font-weight: 800; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,.25); }",
    ".bc-fab:hover { background: var(--primary-hover, #14532d); }",
    ".bc-badge { display: inline-block; background: #dc2626; color: #fff; border-radius: 999px; font-size: 12px; padding: 1px 8px; margin-left: 6px; }",
    ".bc-panel { position: fixed; right: 20px; bottom: 20px; z-index: 9001; width: min(380px, calc(100vw - 24px)); height: min(560px, calc(100vh - 40px)); background: #fff; border: 1px solid var(--border-light, #e4ece5); border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.28); display: flex; flex-direction: column; overflow: hidden; }",
    ".bc-head { background: var(--primary, #166534); color: #fff; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; gap: 10px; }",
    ".bc-head small { display: block; opacity: .85; font-size: 12px; margin-top: 2px; }",
    ".bc-x { border: 0; background: rgba(255,255,255,.18); color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 20px; cursor: pointer; }",
    ".bc-msgs { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 8px; background: #f6f8f5; }",
    ".bc-hello { background: #fff; border: 1px solid var(--border-light, #e4ece5); border-radius: 12px; padding: 12px; font-size: 14px; line-height: 1.6; color: var(--text-muted, #536458); }",
    ".bc-bubble { max-width: 80%; padding: 9px 12px; border-radius: 14px; line-height: 1.5; font-size: 14px; white-space: pre-wrap; word-break: break-word; }",
    ".bc-bubble small { display: block; font-size: 10px; opacity: .65; margin-top: 4px; }",
    ".bc-bubble.me { align-self: flex-end; background: var(--primary, #166534); color: #fff; }",
    ".bc-bubble.them { align-self: flex-start; background: #fff; border: 1px solid var(--border-light, #e4ece5); }",
    ".bc-err { color: #b42318; font-size: 12px; padding: 0 14px; }",
    ".bc-send { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--border-light, #e4ece5); }",
    ".bc-send input { flex: 1; min-width: 0; padding: 11px 12px; border: 1px solid var(--border-light, #e4ece5); border-radius: 10px; font: inherit; font-size: 14px; }",
    ".bc-send button { border: 0; border-radius: 10px; padding: 0 16px; background: var(--primary, #166534); color: #fff; font: inherit; font-weight: 700; cursor: pointer; }",
    ".bc-panel.bc-login { height: auto; }",
    ".bc-loginbody { padding: 22px 20px 24px; text-align: center; }",
    ".bc-loginicon { font-size: 34px; margin-bottom: 6px; }",
    ".bc-loginbody p { margin: 0 0 16px; line-height: 1.7; font-size: 14px; color: var(--text-muted, #536458); }",
    ".bc-loginbtn { display: inline-block; background: var(--primary, #166534); color: #fff; text-decoration: none; font-weight: 700; padding: 12px 20px; border-radius: 10px; }",
    "@media (max-width: 560px) { .bc-panel { right: 8px; bottom: 8px; height: min(70vh, 560px); } .bc-fab { right: 12px; bottom: 12px; } }"
  ].join("\n");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var html =
    '<button type="button" id="bcFab" class="bc-fab" hidden>💬 চ্যাট <span id="bcBadge" class="bc-badge" hidden></span></button>' +
    '<div id="bcPanel" class="bc-panel" hidden>' +
      '<div class="bc-head">' +
        '<div><b>বারাকাহ এগ্রো সাপোর্ট</b><small>মেসেজ লিখুন, আমরা উত্তর দেব</small></div>' +
        '<button type="button" id="bcClose" class="bc-x" aria-label="বন্ধ করুন">×</button>' +
      '</div>' +
      '<div id="bcMsgs" class="bc-msgs">' +
        '<div id="bcHello" class="bc-hello">স্বাগতম! পণ্য বা অর্ডার নিয়ে কিছু জানতে নিচে লিখুন। আপনি যেকোনো সময় মেসেজ করতে পারেন, আমরা সুবিধামতো দ্রুত উত্তর দেব।</div>' +
      '</div>' +
      '<div id="bcErr" class="bc-err"></div>' +
      '<div class="bc-send">' +
        '<input id="bcInput" maxlength="1000" placeholder="মেসেজ লিখুন..." autocomplete="off">' +
        '<button type="button" id="bcSend">পাঠান</button>' +
      '</div>' +
    '</div>';
      html +=
    '<div id="bcLogin" class="bc-panel bc-login" hidden>' +
      '<div class="bc-head">' +
        '<div><b>বারাকাহ এগ্রো সাপোর্ট</b><small>আমাদের সাথে চ্যাট করুন</small></div>' +
        '<button type="button" id="bcLoginClose" class="bc-x" aria-label="বন্ধ করুন">×</button>' +
      '</div>' +
      '<div class="bc-loginbody">' +
        '<div class="bc-loginicon">💬</div>' +
        '<p>আমাদের সাথে চ্যাট করতে আগে <b>লগইন</b> করুন। নতুন হলে এক মিনিটেই অ্যাকাউন্ট খুলে নিতে পারবেন।</p>' +
        '<a href="account.html" class="bc-loginbtn">লগইন / অ্যাকাউন্ট খুলুন</a>' +
      '</div>' +
    '</div>';
  var wrap = document.createElement("div");
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var msgs = [], lastId = 0, seen = 0, isOpen = false, active = false, currentUid = null;

  function user() { return getLoggedInCustomer(); }
  function seenKey() { var u = user(); return "barakah_chat_seen_" + (u && u.userId ? u.userId : ""); }
  function fmtTime(t) { return new Date(t).toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }); }

  async function call(url, opts) {
    var u = user();
    if (!u) throw new Error("login");
    var res = await fetch(url, Object.assign({}, opts || {}, {
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + u.token }
    }));
    var d = await res.json().catch(function () { return {}; });
    if (!res.ok) { var e = new Error(d.error || "সমস্যা হয়েছে।"); e.code = res.status; throw e; }
    return d;
  }

  function updateBadge() {
    var n = msgs.filter(function (m) { return m.sender === "admin" && m.id > seen; }).length;
    var b = $("bcBadge");
    b.textContent = n; b.hidden = !n;
  }

  function markSeen() {
    seen = lastId;
    try { localStorage.setItem(seenKey(), String(seen)); } catch (e) {}
    updateBadge();
  }

  function addMsgs(list) {
    var box = $("bcMsgs"), added = false;
    list.forEach(function (m) {
      if (m.id <= lastId) return;
      lastId = m.id; added = true; msgs.push(m);
      var div = document.createElement("div");
      div.className = "bc-bubble " + (m.sender === "admin" ? "them" : "me");
      div.innerHTML = esc(m.text) + "<small>" + fmtTime(m.createdAt) + "</small>";
      box.appendChild(div);
    });
    if (added) { $("bcHello").style.display = "none"; box.scrollTop = box.scrollHeight; }
  }

  async function poll() {
    if (!user() || document.hidden) return;
    try {
      var d = await call("/api/user/chat?after=" + lastId);
      addMsgs(d.messages || []);
      if (isOpen) markSeen(); else updateBadge();
    } catch (e) { /* try again next time */ }
  }

  function openPanel() {
    isOpen = true;
    $("bcPanel").hidden = false; $("bcFab").hidden = true;
    markSeen();
    var box = $("bcMsgs"); box.scrollTop = box.scrollHeight;
    $("bcInput").focus();
  }
  function closePanel() {
    isOpen = false;
    $("bcPanel").hidden = true; $("bcFab").hidden = false;
  }

  async function send() {
    var inp = $("bcInput"), text = inp.value.trim();
    if (!text) return;
    inp.value = ""; $("bcErr").textContent = "";
    try {
      await call("/api/user/chat", { method: "POST", body: JSON.stringify({ text: text }) });
      await poll();
    } catch (e) {
      $("bcErr").textContent = e.message || "মেসেজ পাঠানো যায়নি।";
      inp.value = text;
    }
  }

  function resetChat() {
    msgs = []; lastId = 0; seen = 0;
    var box = $("bcMsgs");
    Array.prototype.slice.call(box.querySelectorAll(".bc-bubble")).forEach(function (n) { n.remove(); });
    $("bcHello").style.display = "";
    updateBadge();
  }

  function watchLogin() {
    var u = user();
    if (u) {
      if (!active || currentUid !== u.userId) {
        resetChat();
        active = true; currentUid = u.userId;
        try { seen = Number(localStorage.getItem(seenKey())) || 0; } catch (e) { seen = 0; }
        $("bcFab").hidden = isOpen;
        $("bcLogin").hidden = true;
        poll();
      }
        } else {
      if (active) {
        active = false; currentUid = null; isOpen = false;
        $("bcPanel").hidden = true;
        resetChat();
      }
      // visitor is not logged in: show the button, it asks them to log in
      if ($("bcLogin").hidden) $("bcFab").hidden = false;
    }
  }

  $("bcFab").addEventListener("click", function () {
    if (!user()) { $("bcFab").hidden = true; $("bcLogin").hidden = false; return; }
    openPanel();
  });
  
  $("bcLoginClose").addEventListener("click", function () { $("bcLogin").hidden = true; $("bcFab").hidden = false; });
  $("bcClose").addEventListener("click", closePanel);
  $("bcSend").addEventListener("click", send);
  $("bcInput").addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) poll(); });

  setInterval(watchLogin, 1500);
  setInterval(poll, 6000);
  watchLogin();
})();