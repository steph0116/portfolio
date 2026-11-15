(function () {
  const body = document.body;
  const canvas = document.getElementById("leaf-canvas");
  const ctx = canvas.getContext("2d");
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const toast = document.getElementById("mode-toast");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(location.search);
  const savedMode = (() => {
    try { return localStorage.getItem("steph-portfolio-mode"); } catch (e) { return null; }
  })();
  let leaves = [];
  let raf = null;
  let running = false;
  let dpr = 1;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeLeaf(burst) {
    const colors = ["#c8f45a", "#9ccc6a", "#e4c37e", "#4d9b76", "#b7d88a"];
    const size = 5 + Math.random() * 10;
    return {
      x: Math.random() * window.innerWidth,
      y: burst ? -20 - Math.random() * 160 : Math.random() * window.innerHeight,
      r: size,
      vx: (Math.random() - .5) * .55,
      vy: .35 + Math.random() * .9,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - .5) * .025,
      phase: Math.random() * Math.PI * 2,
      sway: .25 + Math.random() * .55,
      alpha: .18 + Math.random() * .45,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function seedLeaves() {
    const count = window.innerWidth < 720 ? 16 : 30;
    leaves = Array.from({ length: count }, () => makeLeaf(false));
  }

  function leafBurst(count) {
    if (!body.classList.contains("mode-immersive") || reduceMotion) return;
    const n = count || 14;
    for (let i = 0; i < n; i++) leaves.push(makeLeaf(true));
    if (leaves.length > 90) leaves = leaves.slice(-90);
  }

  function drawLeaf(leaf) {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate(leaf.rot);
    ctx.globalAlpha = leaf.alpha;
    ctx.fillStyle = leaf.color;
    ctx.beginPath();
    ctx.moveTo(0, -leaf.r);
    ctx.bezierCurveTo(leaf.r * .85, -leaf.r * .25, leaf.r * .55, leaf.r * .7, 0, leaf.r);
    ctx.bezierCurveTo(-leaf.r * .55, leaf.r * .7, -leaf.r * .85, -leaf.r * .25, 0, -leaf.r);
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    leaves.forEach((leaf) => {
      leaf.phase += .012;
      leaf.x += leaf.vx + Math.sin(leaf.phase) * leaf.sway;
      leaf.y += leaf.vy;
      leaf.rot += leaf.vr;
      if (leaf.y > window.innerHeight + 40 || leaf.x < -60 || leaf.x > window.innerWidth + 60) {
        leaf.x = Math.random() * window.innerWidth;
        leaf.y = -30 - Math.random() * 120;
      }
      drawLeaf(leaf);
    });
    raf = requestAnimationFrame(tick);
  }

  function startLeaves() {
    if (reduceMotion || running) return;
    resizeCanvas();
    if (!leaves.length) seedLeaves();
    running = true;
    tick();
  }

  function stopLeaves() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function setMode(mode, persist, announce) {
    const immersive = mode === "immersive";
    body.classList.toggle("mode-immersive", immersive);
    body.classList.toggle("mode-clean", !immersive);
    modeButtons.forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", immersive ? "#07130f" : "#f4f0e7");
    if (persist) {
      try { localStorage.setItem("steph-portfolio-mode", mode); } catch (e) {}
    }
    if (immersive) {
      startLeaves();
      leafBurst(20);
      if (announce) showToast("沉浸版：叶子会随着滚动出现");
    } else {
      stopLeaves();
      if (announce) showToast("简洁版：回到阅读模式");
    }
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode, true, true));
  });

  const initialMode = params.get("mode") === "immersive"
    ? "immersive"
    : (savedMode === "immersive" ? "immersive" : "clean");
  setMode(initialMode, false, false);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => body.classList.remove("no-transition"));
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
    if (running) seedLeaves();
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      if (entry.target.hasAttribute("data-leaf")) leafBurst(12);
      io.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const menu = document.getElementById("nav-links");
  const menuButton = document.getElementById("menu-toggle");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  const visual = document.querySelector(".hero-visual");
  if (visual) {
    const orbA = visual.querySelector(".orb-a");
    const orbB = visual.querySelector(".orb-b");
    visual.addEventListener("pointermove", (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      if (orbA) orbA.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
      if (orbB) orbB.style.transform = `translate(${x * -24}px, ${y * -24}px)`;
    });
    visual.addEventListener("pointerleave", () => {
      if (orbA) orbA.style.transform = "";
      if (orbB) orbB.style.transform = "";
    });
  }
})();
