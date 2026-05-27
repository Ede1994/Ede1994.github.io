(function () {
  const config = window.SITE_CONFIG;
  if (!config) return;

  initTheme();
  populateContent();
  initTypingEffect();
  initClock();
  initParticles();

  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;

    toggle?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  function populateContent() {
    document.getElementById("site-name").textContent = config.name;
    document.getElementById("site-tagline").textContent = config.tagline;
    document.getElementById("site-location").textContent = config.location;
    document.title = config.name;

    const grid = document.getElementById("link-grid");
    const icons = {
      linkedin: "in",
      employer: "◆",
      scholar: "∑",
      portfolio: "</>",
      email: "@",
    };

    Object.entries(config.links).forEach(([key, link]) => {
      const card = document.createElement("a");
      card.className = "link-card";
      card.href = link.url;
      card.target = key === "email" ? "_self" : "_blank";
      card.rel = key === "email" ? "" : "noopener noreferrer";
      card.innerHTML = `
        <span class="link-card-label">${icons[key] || "→"} ${link.label}</span>
        <span class="link-card-desc">${link.description}</span>
      `;
      grid.appendChild(card);
    });

    const countEl = document.getElementById("country-count");
    const target = config.visitedCountries.length;
    animateCount(countEl, target);
  }

  function animateCount(element, target) {
    if (!element) return;
    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function initTypingEffect() {
    const el = document.getElementById("typing-text");
    const roles = config.typingRoles;
    if (!el || !roles.length) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      const displayed = deleting
        ? current.slice(0, charIndex--)
        : current.slice(0, charIndex++);

      el.textContent = displayed;

      let delay = deleting ? 35 : 55;

      if (!deleting && charIndex === current.length + 1) {
        deleting = true;
        delay = 1800;
        charIndex = current.length;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    }

    tick();
  }

  function initClock() {
    const el = document.getElementById("local-time");
    if (!el) return;

    function update() {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: config.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      el.textContent = `${formatter.format(new Date())} · ${config.location.split(",")[0]}`;
    }

    update();
    setInterval(update, 30_000);
  }

  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: Math.min(48, Math.floor(width / 28)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const color =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
        "#0f766e";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.18;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
  }
})();
