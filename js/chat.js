/* ==========================================================================
   BARAKAH AGRO - Customer Chat Widget (js/chat.js)
   Shows a floating "চ্যাট" button on every page for logged-in customers.
   ========================================================================== */
(function () {
  if (document.getElementById("bcFab")) return;          // already on this page
  if (typeof getLoggedInCustomer !== "function") return; // script.js not loaded

    var css = `
.bc-fab[hidden], .bc-panel[hidden], .bc-badge[hidden] { display: none; }

/* ---- Button on the right edge, vertically centered ---- */
.bc-fab { position: fixed; right: 0; top: 50%; transform: translateY(-50%); z-index: 9000; width: 80px; padding: 16px 8px 14px; border: 0; border-radius: 22px 0 0 22px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; background: linear-gradient(160deg, #22a559 0%, #166534 55%, #0f391e 100%); color: #fff; font: inherit; font-size: 15px; font-weight: 800; line-height: 1.3; text-align: center; box-shadow: -8px 10px 32px rgba(15,57,30,.5); animation: bcNudge 6s ease-in-out infinite; }
.bc-fab::before { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; animation: bcPulse 2.4s ease-out infinite; }
.bc-fab:hover { animation: none; transform: translateY(-50%) translateX(-5px); }
.bc-fab-ico { position: relative; width: 46px; height: 46px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 25px; box-shadow: 0 4px 12px rgba(0,0,0,.2); }
.bc-fab-ico::after { content: ''; position: absolute; right: 1px; bottom: 1px; width: 12px; height: 12px; border-radius: 50%; background: #22c55e; border: 2px solid #fff; }
.bc-badge { position: absolute; top: -8px; left: -8px; min-width: 26px; height: 26px; padding: 0 7px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 999px; background: #ef4444; color: #fff; font-size: 13px; font-weight: 800; border: 2px solid #fff; }

@keyframes bcPulse { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,.6); } 70% { box-shadow: 0 0 0 18px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
@keyframes bcNudge { 0%, 86%, 100% { transform: translateY(-50%); } 90% { transform: translateY(-50%) translateX(-8px); } 94% { transform: translateY(-50%); } 97% { transform: translateY(-50%) translateX(-5px); } }
@keyframes bcPop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes bcIn { from { opacity: 0; transform: translateY(-50%) translateX(30px); } to { opacity: 1; transform: translateY(-50%); } }

/* ---- Chat box ---- */
.bc-panel { position: fixed; right: 18px; top: 50%; transform: translateY(-50%); z-index: 9001; width: min(420px, calc(100vw - 24px)); height: min(640px, calc(100vh - 32px)); background: #fff; border-radius: 22px; box-shadow: 0 25px 70px rgba(0,0,0,.35); display: flex; flex-direction: column; overflow: hidden; animation: bcIn .25s ease-out; }
.bc-panel.bc-login { height: auto; }
.bc-head { background: linear-gradient(135deg, #1f8f4a, #166534 60%, #0f391e); color: #fff; padding: 18px; display: flex; align-items: center; gap: 12px; }
.bc-head::before { content: '🌿'; flex: none; width: 46px; height: 46px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.bc-head > div { flex: 1; min-width: 0; }
.bc-head b { font-size: 17px; }
.bc-head small { display: block; margin-top: 3px; font-size: 13px; opacity: .92; }
.bc-head small::before { content: ''; display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: #4ade80; margin-right: 6px; }
.bc-x { flex: none; border: 0; background: rgba(255,255,255,.2); color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 22px; line-height: 1; cursor: pointer; }
.bc-x:hover { background: rgba(255,255,255,.35); }
.bc-msgs { flex: 1; overflow-y: auto; padding: 18px 16px; display: flex; flex-direction: column; gap: 10px; background: #eef5ef; }
.bc-hello { background: #fff; border-radius: 16px; padding: 14px 16px; font-size: 15px; line-height: 1.7; color: #2f3e33; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.bc-bubble { max-width: 82%; padding: 11px 14px; border-radius: 18px; line-height: 1.55; font-size: 15px; white-space: pre-wrap; word-break: break-word; animation: bcPop .2s ease-out; box-shadow: 0 2px 6px rgba(0,0,0,.07); }
.bc-bubble small { display: block; font-size: 11px; opacity: .65; margin-top: 5px; }
.bc-bubble.me { align-self: flex-end; background: linear-gradient(135deg, #1f8f4a, #166534); color: #fff; border-bottom-right-radius: 5px; }
.bc-bubble.them { align-self: flex-start; background: #fff; color: #1f2a22; border-bottom-left-radius: 5px; }
.bc-err { color: #b42318; font-size: 13px; padding: 8px 16px 0; background: #fff; }
.bc-err:empty { display: none; }
.bc-send { display: flex; gap: 10px; padding: 14px; background: #fff; border-top: 1px solid #e4ece5; }
.bc-send input { flex: 1; min-width: 0; padding: 13px 16px; border: 2px solid #dbe6dd; border-radius: 999px; font: inherit; font-size: 15px; outline: none; }
.bc-send input:focus { border-color: #22a559; }
.bc-send button { border: 0; border-radius: 999px; padding: 0 22px; background: linear-gradient(135deg, #22a559, #166534); color: #fff; font: inherit; font-weight: 800; font-size: 15px; cursor: pointer; }
.bc-send button:hover { filter: brightness(1.08); }

/* ---- Login prompt (visitor not logged in) ---- */
.bc-loginbody { padding: 28px 24px 30px; text-align: center; background: #eef5ef; }
.bc-loginicon { font-size: 44px; margin-bottom: 8px; }
.bc-loginbody p { margin: 0 0 20px; line-height: 1.8; font-size: 15px; color: #2f3e33; }
.bc-loginbtn { display: inline-block; background: linear-gradient(135deg, #22a559, #166534); color: #fff; text-decoration: none; font-weight: 800; padding: 14px 26px; border-radius: 999px; box-shadow: 0 8px 20px rgba(22,101,52,.35); }

/* ---- Mobile ---- */
@media (max-width: 560px) {
  .bc-fab { width: 66px; padding: 12px 6px 10px; font-size: 13px; }
  .bc-fab-ico { width: 38px; height: 38px; font-size: 21px; }
  .bc-panel { left: 8px; right: 8px; width: auto; top: auto; bottom: 8px; transform: none; height: min(78vh, 640px); animation-name: bcPop; }
  .bc-panel.bc-login { height: auto; }
}
@media (prefers-reduced-motion: reduce) { .bc-fab, .bc-fab::before, .bc-panel, .bc-bubble { animation: none; } }
`;
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var html =
        '<button type="button" id="bcFab" class="bc-fab" hidden><span class="bc-fab-ico">💬</span><span>চ্যাট<br>করুন</span><span id="bcBadge" class="bc-badge" hidden></span></button>' +
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
            if ($("bcLogin").hidden && !/account\.html/.test(location.pathname)) $("bcFab").hidden = false;
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