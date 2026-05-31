/* ===================== 司南生态助手 ===================== */

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
let toastTimer;
function toast(msg) {
  let t = $(".toast");
  if (!t) { t = el("div", "toast"); document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1600);
}

/* ===================== DATA ===================== */

const TABS = [
  { id: "home",  label: "首页",   sub: "设计生态一站式工作台",
    icon: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"/><path d="M10 20v-5h4v5"/>' },
  { id: "tools", label: "工具",   sub: "常用网站 · 工具 · 设计资源",
    icon: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>' },
  { id: "specs", label: "设计规范", sub: "Banner · 页面 · 品牌规范",
    icon: '<path d="M6 3.5h9l4 4V20a.5.5 0 01-.5.5h-12A.5.5 0 016 20z"/><path d="M14.5 3.5V8h4.5"/><path d="M9 12h7M9 15.5h7"/>' },
  { id: "cases", label: "案例",   sub: "优秀案例 · 可筛选",
    icon: '<path d="M12 3.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.9l-5.25 2.7 1-5.8L3.5 9.7l5.9-.9z"/>' },
  { id: "mine",  label: "我的",   sub: "收藏 · 上传案例 · 个人案例库",
    icon: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0115 0"/>' },
];

const QUICK = ["帮我找 Banner 尺寸规范", "推荐一个抠图工具", "查看 S 级优秀案例", "如何上传案例？"];

const GUIDES = [
  { i: "🧭", c: "#e8f1ff", t: "快速上手", d: "3 分钟了解助手能力" },
  { i: "📐", c: "#eafff3", t: "规范速查", d: "Banner / 页面 / 品牌" },
  { i: "🛠️", c: "#fff4e8", t: "工具集合", d: "压缩 · 抠图 · 生成" },
  { i: "⭐", c: "#f3eaff", t: "案例灵感", d: "按等级 / 时间筛选" },
];

const EXISTING_TOOLS = [
  { n: "WeaveFox", d: "AI 设计与代码协同平台", c: "#1677ff", k: "W" },
  { n: "画眉",      d: "智能海报 / Banner 生成", c: "#13a8a8", k: "眉" },
  { n: "灵矽",      d: "设计素材与灵感聚合", c: "#7c4dff", k: "灵" },
];

const COMMON_SITES = [
  { n: "下单平台", c: "#1677ff", k: "单" },
  { n: "画眉平台", c: "#13a8a8", k: "眉" },
  { n: "AI 平台",  c: "#7c4dff", k: "AI" },
  { n: "九尾平台", c: "#fa8c16", k: "九" },
];

const COMMON_TOOLS = [
  { i: "🗜️", c: "#e8f1ff", t: "图片压缩", d: "无损 / 批量压缩，减小体积", tag: "高频" },
  { i: "✂️", c: "#eafff3", t: "图片抠图", d: "AI 一键抠图，自动去背景", tag: "AI" },
  { i: "🎨", c: "#fff4e8", t: "图片调色", d: "色彩校正与风格化调色" },
  { i: "🖼️", c: "#f3eaff", t: "图像生成", d: "文生图 / 图生图", tag: "AI" },
  { i: "🎬", c: "#ffeef0", t: "视频生成", d: "图文转视频，自动剪辑", tag: "AI" },
];

const DESIGN_SITES = [
  { i: "🌸", c: "#ffeef3", t: "花瓣网", d: "采集与灵感画板", tag: "灵感" },
  { i: "🏷️", c: "#e8f1ff", t: "品牌网站", d: "品牌 VI 与案例参考" },
  { i: "🅩", c: "#eafff3", t: "站酷 ZCOOL", d: "国内设计师作品社区" },
  { i: "🅑", c: "#eef0ff", t: "Behance", d: "全球创意作品集" },
  { i: "🔤", c: "#fff4e8", t: "字体网站", d: "可商用字体下载" },
];

/* ----- 设计规范 ----- */
const SPECS = {
  banner: {
    label: "Banner 规范",
    items: [
      { i: "📏", t: "尺寸规范", rows: [
        { t: "首页通栏 Banner", d: "1920×640px，安全区两侧留白 ≥ 240px" },
        { t: "活动弹窗", d: "750×1000px，圆角 16px" },
        { t: "信息流广告", d: "1080×1080 / 1080×1350px" },
      ]},
      { i: "📝", t: "内容规范", rows: [
        { t: "主标题", d: "≤ 14 字，突出核心利益点" },
        { t: "副标题 / 按钮", d: "副标题 ≤ 20 字，按钮文案 ≤ 6 字" },
        { t: "信息层级", d: "主标题 > 副标题 > 说明 > 按钮，层级清晰" },
      ]},
      { i: "🎨", t: "风格规范", rows: [
        { t: "主色", d: "以品牌蓝 #1677ff 为主，辅色不超过 2 种" },
        { t: "图形风格", d: "扁平 + 轻渐变，避免过度拟物" },
        { t: "氛围", d: "保持简洁、科技、可信赖的视觉调性" },
      ]},
      { i: "📦", t: "输出规范", rows: [
        { t: "格式", d: "JPG（实拍）/ PNG（透明）/ WebP（H5）" },
        { t: "体积", d: "单张 ≤ 300KB，首屏资源 ≤ 1MB" },
        { t: "命名", d: "模块_用途_尺寸_版本，如 home_banner_1920x640_v2" },
      ]},
    ],
  },
  page: {
    label: "页面规范",
    items: [
      { i: "🧩", t: "组件规范", rows: [
        { t: "基础组件", d: "按钮 / 输入框 / 卡片统一圆角 12px、间距 8 的倍数" },
        { t: "状态", d: "默认 / 悬停 / 按下 / 禁用四态齐全" },
        { t: "命名", d: "组件命名遵循「类型-用途-状态」" },
      ]},
      { i: "👆", t: "交互规范", rows: [
        { t: "反馈", d: "点击 100ms 内有视觉反馈，加载 > 1s 显示 Loading" },
        { t: "手势", d: "可滑动区域提供明确滚动提示" },
        { t: "防误触", d: "可点击区域 ≥ 44×44px" },
      ]},
      { i: "📱", t: "适配规范", rows: [
        { t: "断点", d: "移动端 ≤ 430px，平板 768px，桌面 ≥ 1024px" },
        { t: "栅格", d: "移动端 4 列，间距 12px，左右边距 14px" },
        { t: "安全区", d: "适配刘海屏与底部 Home 指示条" },
      ]},
    ],
  },
  brand: {
    label: "品牌规范",
    items: [
      { i: "🎯", t: "VI 系统", rows: [
        { t: "标志", d: "标准制图、最小尺寸与组合规范" },
        { t: "辅助图形", d: "品牌专属纹样与延展规则" },
      ]},
      { i: "🔖", t: "Logo 使用", rows: [
        { t: "安全间距", d: "四周留白 ≥ Logo 高度的 1/2" },
        { t: "禁用项", d: "禁止拉伸、变色、加描边或阴影" },
        { t: "反白", d: "深色背景使用反白版本" },
      ]},
      { i: "🌈", t: "色彩系统", rows: [
        { t: "主色", d: "品牌蓝 #1677ff，强调与主操作" },
        { t: "辅助色", d: "#0958d9 / #36cfc9 / 中性灰阶" },
        { t: "功能色", d: "成功 #00a854，警告 #fa8c16，错误 #f53f3f" },
      ]},
    ],
  },
};

/* ----- 优秀案例 ----- */
const CASE_FILTERS = {
  type:  { label: "分类", options: ["全部", "插画", "品牌", "体验", "动画", "3D"] },
  year:  { label: "时间", options: ["全部", "2024", "2025", "2026"] },
  level: { label: "等级", options: ["全部", "S级", "A级", "BC级"] },
};

const CASES = [
  { t: "新春主视觉插画", type: "插画", year: "2026", level: "S级", g: "linear-gradient(135deg,#ff7a45,#ff4d4f)", ico: "🎨" },
  { t: "司南品牌升级 VI", type: "品牌", year: "2026", level: "S级", g: "linear-gradient(135deg,#1677ff,#0958d9)", ico: "🎯" },
  { t: "智能助手体验设计", type: "体验", year: "2026", level: "A级", g: "linear-gradient(135deg,#36cfc9,#13a8a8)", ico: "📱" },
  { t: "开屏动效动画", type: "动画", year: "2025", level: "A级", g: "linear-gradient(135deg,#9254de,#722ed1)", ico: "🎬" },
  { t: "产品 3D 场景", type: "3D", year: "2025", level: "S级", g: "linear-gradient(135deg,#597ef7,#2f54eb)", ico: "🧊" },
  { t: "节日营销插画", type: "插画", year: "2025", level: "BC级", g: "linear-gradient(135deg,#ffc53d,#fa8c16)", ico: "🖼️" },
  { t: "品牌发布会 KV", type: "品牌", year: "2024", level: "A级", g: "linear-gradient(135deg,#40a9ff,#1677ff)", ico: "🏷️" },
  { t: "落地页体验改版", type: "体验", year: "2024", level: "BC级", g: "linear-gradient(135deg,#73d13d,#52c41a)", ico: "📐" },
  { t: "数据可视化动画", type: "动画", year: "2024", level: "A级", g: "linear-gradient(135deg,#ff85c0,#eb2f96)", ico: "📊" },
  { t: "电商 3D 主图", type: "3D", year: "2026", level: "BC级", g: "linear-gradient(135deg,#5cdbd3,#08979c)", ico: "🛒" },
  { t: "国潮系列插画", type: "插画", year: "2024", level: "S级", g: "linear-gradient(135deg,#ff9c6e,#d4380d)", ico: "🐉" },
  { t: "品牌色彩系统", type: "品牌", year: "2025", level: "A级", g: "linear-gradient(135deg,#85a5ff,#2f54eb)", ico: "🌈" },
];

/* ----- 我的 ----- */
const STATS = [ { n: "28", l: "收藏" }, { n: "12", l: "已上传" }, { n: "3", l: "审核中" } ];
const FAV_CATS = ["规范", "案例", "工具", "网站"];
const FAVS = {
  "规范": [
    { i: "📏", c: "#e8f1ff", t: "Banner 尺寸规范", d: "首页通栏 1920×640px" },
    { i: "🌈", c: "#f3eaff", t: "品牌色彩系统", d: "主色 #1677ff" },
  ],
  "案例": [
    { i: "🎯", c: "#e8f1ff", t: "司南品牌升级 VI", d: "S级 · 2026 · 品牌" },
    { i: "🧊", c: "#eef0ff", t: "产品 3D 场景", d: "S级 · 2025 · 3D" },
  ],
  "工具": [
    { i: "✂️", c: "#eafff3", t: "图片抠图", d: "AI 一键去背景" },
    { i: "🗜️", c: "#e8f1ff", t: "图片压缩", d: "无损批量压缩" },
  ],
  "网站": [
    { i: "🌸", c: "#ffeef3", t: "花瓣网", d: "灵感采集画板" },
    { i: "🅑", c: "#eef0ff", t: "Behance", d: "全球创意作品集" },
  ],
};

const UPLOAD_MENU = [
  { i: "📋", t: "上传案例规范", d: "尺寸 / 格式 / 命名要求", r: "" },
  { i: "🔁", t: "案例审核流程", d: "提交 → 初审 → 终审 → 收录", r: "" },
  { i: "📁", t: "个人案例库", d: "已上传 12 · 审核中 3 · 已收录 9", r: "" },
];
const PERSONAL_LIB = [
  { t: "新春主视觉插画", d: "2026-02-01 上传", status: "已收录", cls: "pill--green" },
  { t: "活动 Banner 三连", d: "2026-05-20 上传", status: "审核中", cls: "pill--orange" },
  { t: "落地页改版方案", d: "2026-05-28 上传", status: "待补充", cls: "pill--orange" },
];

/* ===================== RENDER ===================== */

/* ---- Sidebar nav ---- */
function renderSidebar() {
  const nav = $("#sidebarNav");
  TABS.forEach((t, idx) => {
    const b = el("button", "nav-item" + (idx === 0 ? " is-active" : ""));
    b.dataset.target = t.id;
    b.title = t.label;
    b.innerHTML = `<svg viewBox="0 0 24 24">${t.icon}</svg><span class="nav-item__label">${t.label}</span>`;
    b.addEventListener("click", () => switchTab(t.id));
    nav.appendChild(b);
  });
}
function switchTab(id) {
  const tab = TABS.find((t) => t.id === id);
  $$(".page").forEach((p) => p.classList.toggle("is-active", p.dataset.page === id));
  $$(".nav-item").forEach((b) => b.classList.toggle("is-active", b.dataset.target === id));
  $("#headerTitle").textContent = tab.label;
  $("#headerSub").textContent = tab.sub;
  $("#tabContent").scrollTop = 0;
}

/* ---- Home ---- */
function renderHome() {
  const q = $("#chatQuick");
  QUICK.forEach((text) => {
    const c = el("span", "quick-chip", text);
    c.addEventListener("click", () => sendMessage(text));
    q.appendChild(c);
  });

  const g = $("#guideGrid");
  GUIDES.forEach((it) => {
    const card = el("div", "guide-card");
    card.innerHTML = `<div class="guide-card__icon" style="background:${it.c}">${it.i}</div>
      <div><div class="guide-card__t">${it.t}</div><div class="guide-card__d">${it.d}</div></div>`;
    card.addEventListener("click", () => toast(`打开「${it.t}」`));
    g.appendChild(card);
  });

  const e = $("#existingTools");
  EXISTING_TOOLS.forEach((it) => {
    const row = el("div", "tool-link");
    row.innerHTML = `<div class="tool-link__logo" style="background:${it.c}">${it.k}</div>
      <div class="tool-link__body"><div class="tool-link__t">${it.n}</div><div class="tool-link__d">${it.d}</div></div>
      <div class="tool-link__arrow">›</div>`;
    row.addEventListener("click", () => toast(`正在前往 ${it.n} …`));
    e.appendChild(row);
  });

  // chat
  $("#sendBtn").addEventListener("click", () => {
    const v = $("#chatInput").value.trim();
    if (v) sendMessage(v);
  });
  $("#chatInput").addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") { const v = ev.target.value.trim(); if (v) sendMessage(v); }
  });
  $("#fileBtn").addEventListener("click", () => $("#fileInput").click());
  $("#fileInput").addEventListener("change", (ev) => {
    const files = [...ev.target.files];
    const box = $("#chatFiles");
    files.forEach((f) => {
      const pill = el("span", "file-pill", `📎 ${f.name}`);
      box.appendChild(pill);
    });
    if (files.length) toast(`已添加 ${files.length} 个文件`);
    ev.target.value = "";
  });
}
const BOT_REPLIES = [
  "收到～已为你检索司南生态库中的相关内容，可在对应 Tab 查看详情。",
  "好的，这里有几条匹配结果，建议先看「设计规范」与「优秀案例」两个板块。",
  "明白！相关工具已在「工具」Tab 为你高亮，点击即可直达。",
];
function sendMessage(text) {
  const scroll = $("#chatScroll");
  const u = el("div", "chat-msg chat-msg--user");
  u.innerHTML = `<div class="chat-avatar">我</div><div class="chat-bubble">${text}</div>`;
  scroll.appendChild(u);
  $("#chatInput").value = "";
  scroll.scrollTop = scroll.scrollHeight;
  setTimeout(() => {
    const b = el("div", "chat-msg chat-msg--bot");
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
    b.innerHTML = `<div class="chat-avatar">司</div><div class="chat-bubble">${reply}</div>`;
    scroll.appendChild(b);
    scroll.scrollTop = scroll.scrollHeight;
  }, 550);
}

/* ---- Tools ---- */
function renderTools() {
  const cs = $("#commonSites");
  const drawSites = () => {
    cs.innerHTML = "";
    COMMON_SITES.forEach((s) => {
      const chip = el("div", "site-chip");
      chip.innerHTML = `<div class="site-chip__ic" style="background:${s.c}">${s.k}</div><div class="site-chip__n">${s.n}</div>`;
      chip.addEventListener("click", () => toast(`打开 ${s.n}`));
      cs.appendChild(chip);
    });
  };
  drawSites();

  $(".section__more[data-add='sites']").addEventListener("click", () => {
    $("#addSiteRow").hidden = !$("#addSiteRow").hidden;
    if (!$("#addSiteRow").hidden) $("#addSiteInput").focus();
  });
  const addSite = () => {
    const v = $("#addSiteInput").value.trim();
    if (!v) return toast("请输入网站名称");
    const colors = ["#1677ff", "#13a8a8", "#7c4dff", "#fa8c16", "#eb2f96", "#52c41a"];
    COMMON_SITES.push({ n: v, c: colors[COMMON_SITES.length % colors.length], k: v[0] });
    $("#addSiteInput").value = "";
    $("#addSiteRow").hidden = true;
    drawSites();
    toast(`已添加「${v}」`);
  };
  $("#addSiteBtn").addEventListener("click", addSite);
  $("#addSiteInput").addEventListener("keydown", (e) => { if (e.key === "Enter") addSite(); });

  const fillList = (sel, arr) => {
    const box = $(sel);
    arr.forEach((it) => {
      const card = el("div", "list-card");
      card.innerHTML = `<div class="list-card__ic" style="background:${it.c}">${it.i}</div>
        <div class="list-card__body"><div class="list-card__t">${it.t}</div><div class="list-card__d">${it.d}</div></div>
        ${it.tag ? `<span class="list-card__tag">${it.tag}</span>` : ""}`;
      card.addEventListener("click", () => toast(`打开「${it.t}」`));
      box.appendChild(card);
    });
  };
  fillList("#commonTools", COMMON_TOOLS);
  fillList("#designSites", DESIGN_SITES);
}

/* ---- Specs ---- */
function renderSpecs() {
  const tabs = $("#specTabs");
  const keys = Object.keys(SPECS);
  keys.forEach((k, i) => {
    const t = el("div", "spec-tab" + (i === 0 ? " is-on" : ""), SPECS[k].label);
    t.dataset.k = k;
    t.addEventListener("click", () => {
      $$(".spec-tab").forEach((x) => x.classList.toggle("is-on", x === t));
      drawAccordion(k);
    });
    tabs.appendChild(t);
  });
  drawAccordion(keys[0]);
}
function drawAccordion(key) {
  const box = $("#specAccordion");
  box.innerHTML = "";
  SPECS[key].items.forEach((item, idx) => {
    const ac = el("div", "acc-item" + (idx === 0 ? " is-open" : ""));
    const rows = item.rows.map((r) =>
      `<div class="spec-row"><div class="spec-row__dot"></div><div><div class="spec-row__t">${r.t}</div><div class="spec-row__d">${r.d}</div></div></div>`
    ).join("");
    ac.innerHTML = `
      <div class="acc-head">
        <div class="acc-head__ic">${item.i}</div>
        <div class="acc-head__t">${item.t}</div>
        <span class="acc-head__cnt">${item.rows.length} 项</span>
        <svg class="acc-head__arrow" viewBox="0 0 24 24" width="18" height="18"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="acc-body"><div class="acc-body__inner">${rows}</div></div>`;
    ac.querySelector(".acc-head").addEventListener("click", () => ac.classList.toggle("is-open"));
    box.appendChild(ac);
  });
}

/* ---- Cases ---- */
const activeFilter = { type: "全部", year: "全部", level: "全部" };
function renderCases() {
  const box = $("#caseFilters");
  Object.entries(CASE_FILTERS).forEach(([key, cfg]) => {
    const group = el("div", "filter-group");
    group.appendChild(el("span", "filter-group__label", cfg.label));
    cfg.options.forEach((opt) => {
      const chip = el("span", "filter-chip" + (opt === "全部" ? " is-on" : ""), opt);
      chip.addEventListener("click", () => {
        activeFilter[key] = opt;
        $$(".filter-chip", group).forEach((c) => c.classList.toggle("is-on", c === chip));
        drawCases();
      });
      group.appendChild(chip);
    });
    box.appendChild(group);
  });
  drawCases();
}
function drawCases() {
  const grid = $("#caseGrid");
  grid.innerHTML = "";
  const list = CASES.filter((c) =>
    (activeFilter.type === "全部" || c.type === activeFilter.type) &&
    (activeFilter.year === "全部" || c.year === activeFilter.year) &&
    (activeFilter.level === "全部" || c.level === activeFilter.level)
  );
  $("#caseCount").textContent = `共 ${list.length} 个案例`;
  if (!list.length) { grid.innerHTML = `<div class="empty" style="grid-column:1/-1">暂无匹配案例，试试调整筛选条件</div>`; return; }
  list.forEach((c) => {
    const card = el("div", "case-card");
    card.innerHTML = `
      <div class="case-thumb" style="background:${c.g}">
        <span class="case-badge">${c.level}</span>
        <div class="case-fav">★</div>
        ${c.ico}
      </div>
      <div class="case-info">
        <div class="case-info__t">${c.t}</div>
        <div class="case-info__meta">
          <span class="case-tag">${c.type}</span><span class="case-tag">${c.year}</span>
        </div>
      </div>`;
    const fav = card.querySelector(".case-fav");
    fav.addEventListener("click", (e) => {
      e.stopPropagation();
      fav.classList.toggle("is-on");
      toast(fav.classList.contains("is-on") ? "已收藏" : "已取消收藏");
    });
    card.addEventListener("click", () => toast(`查看案例「${c.t}」`));
    grid.appendChild(card);
  });
}

/* ---- Mine ---- */
function renderMine() {
  const sr = $("#statRow");
  STATS.forEach((s) => {
    sr.appendChild(el("div", "stat-cell", `<div class="stat-cell__n">${s.n}</div><div class="stat-cell__l">${s.l}</div>`));
  });

  const ft = $("#favTabs");
  const drawFav = (cat) => {
    const box = $("#favList");
    box.innerHTML = "";
    FAVS[cat].forEach((it) => {
      const card = el("div", "list-card");
      card.innerHTML = `<div class="list-card__ic" style="background:${it.c}">${it.i}</div>
        <div class="list-card__body"><div class="list-card__t">${it.t}</div><div class="list-card__d">${it.d}</div></div>
        <div class="tool-link__arrow">›</div>`;
      card.addEventListener("click", () => toast(`打开「${it.t}」`));
      box.appendChild(card);
    });
  };
  FAV_CATS.forEach((cat, i) => {
    const t = el("div", "fav-tab" + (i === 0 ? " is-on" : ""), cat);
    t.addEventListener("click", () => {
      $$(".fav-tab").forEach((x) => x.classList.toggle("is-on", x === t));
      drawFav(cat);
    });
    ft.appendChild(t);
  });
  drawFav(FAV_CATS[0]);

  const um = $("#uploadMenu");
  UPLOAD_MENU.forEach((it, idx) => {
    const row = el("div", "menu-item");
    row.innerHTML = `<div class="menu-item__ic">${it.i}</div>
      <div class="menu-item__body"><div class="menu-item__t">${it.t}</div><div class="menu-item__d">${it.d}</div></div>
      <span class="menu-item__arrow">›</span>`;
    if (idx === 2) {
      row.addEventListener("click", () => togglePersonalLib(row));
    } else {
      row.addEventListener("click", () => toast(`打开「${it.t}」`));
    }
    um.appendChild(row);
  });
}
let libOpen = false;
function togglePersonalLib(row) {
  const um = $("#uploadMenu");
  const existing = $("#personalLib");
  if (existing) { existing.remove(); libOpen = false; return; }
  const wrap = el("div", "sub-list");
  wrap.id = "personalLib";
  PERSONAL_LIB.forEach((p) => {
    const item = el("div", "menu-item");
    item.style.paddingLeft = "12px";
    item.innerHTML = `<div class="menu-item__ic" style="background:#f2f7ff">🗂️</div>
      <div class="menu-item__body"><div class="menu-item__t" style="font-size:13.5px">${p.t}</div><div class="menu-item__d">${p.d}</div></div>
      <span class="menu-item__r"><span class="pill ${p.cls}">${p.status}</span></span>`;
    item.addEventListener("click", () => toast(`「${p.t}」· 反馈：${p.status === "已收录" ? "已被 8 人使用" : "等待处理"}`));
    wrap.appendChild(item);
  });
  row.after(wrap);
  libOpen = true;
}

/* ===================== INIT ===================== */
renderSidebar();
renderHome();
renderTools();
renderSpecs();
renderCases();
renderMine();
