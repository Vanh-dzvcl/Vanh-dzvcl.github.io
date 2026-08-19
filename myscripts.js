let gIsLight = false;
/* ============================================
   0. BOOT SCREEN
   ============================================ */
(function () {
    const screen = document.getElementById('boot-screen');
    const textEl = document.getElementById('boot-text');
    const bar    = document.getElementById('boot-bar');
    if (!screen) return;

    const lines = [
        { t: '> Initializing OS', c: '#b482ff' },
        { t: '> Loading kernel modules...      [OK]', c: '#888' },
        { t: '> Mounting filesystem...         [OK]', c: '#888' },
        { t: '> Checking network interface...  [OK]', c: '#888' },
        { t: '> Authenticating user: Kn1ghT   [OK]', c: '#98c379' },
        { t: '> Decrypting profile data...     [OK]', c: '#888' },
        { t: '> Starting matrix renderer...    [OK]', c: '#888' },
        { t: '\n  Welcome back, Phan Việt Anh.', c: '#e0c3fc' },
    ];

    let i = 0;
    function nextLine() {
        if (i >= lines.length) {
            bar.style.width = '100%';
            setTimeout(() => {
                screen.classList.add('hide');
                setTimeout(() => screen.remove(), 850);
            }, 600);
            return;
        }
        const span = document.createElement('span');
        span.style.color = lines[i].c;
        span.textContent = lines[i].t + '\n';
        textEl.appendChild(span);
        bar.style.width = ((i + 1) / lines.length * 100) + '%';
        i++;
        setTimeout(nextLine, i === lines.length ? 400 : 160 + Math.random() * 120);
    }
    nextLine();
})();
/* ============================================
   1. MATRIX RAIN GỐC + TEXT MERGE (HYBRID)
   ============================================ */
(function () {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>{}[]()#@$%^&*';
    const FS = 14;
    let cols = [];

    // Khởi tạo mưa gốc
    function initCols() {
        const n = Math.floor(canvas.width / FS);
        cols = Array.from({ length: n }, () => Math.random() * -(canvas.height / FS) * 2);
    }
    initCols();
    window.addEventListener('resize', initCols);

    function draw() {
    const isLight = gIsLight;
    ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(5, 5, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = FS + 'px monospace';
    cols.forEach((y, i) => {
        const x = i * FS;
        const alpha = Math.max(0, 0.8 - (y / (canvas.height / FS)) * 0.4);
        ctx.fillStyle = isLight
            ? `rgba(100, 40, 200, ${alpha * 0.9})`
            : `rgba(180, 130, 255, ${alpha * 0.7})`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y * FS);
        ctx.fillStyle = isLight
            ? `rgba(60, 0, 160, ${alpha})`
            : `rgba(230, 210, 255, ${alpha})`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y + 1) * FS);
        cols[i]++;
        if (y * FS > canvas.height && Math.random() > 0.975) cols[i] = 0;
    });
}

    setInterval(draw, 48);
})();
/* ============================================
   3. TYPING TAGLINE
   ============================================ */
(function () {
    const lines = [
        'First-year Student',
        'Junior Developer',
        'Kn1ghT',
    ];
    const el = document.querySelector('.profile-tagline');
    if (!el) return;

    let lineIdx = 0, charIdx = 0, deleting = false;
    function tick() {
        const cur = lines[lineIdx];
        if (deleting) el.textContent = cur.substring(0, --charIdx);
        else el.textContent = cur.substring(0, ++charIdx);

        let delay = deleting ? 45 : 90;
        if (!deleting && charIdx === cur.length) { delay = 1800; deleting = true; }
        else if (deleting && charIdx === 0) { deleting = false; lineIdx = (lineIdx + 1) % lines.length; delay = 300; }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 800);
})();

/* ============================================
   4. SYSTEM LATENCY / TIME
   ============================================ */
(function () {
    const latEl = document.getElementById('sys-lat');
    const timeEl = document.getElementById('sys-time');

    function updateTime() {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        timeEl.textContent = `${hh}:${mm}:${ss}`;
    }
    function pingLat() {
        const fake = Math.floor(Math.random() * 30 + 5);
        latEl.textContent = `LAT:${fake}ms`;
    }
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(pingLat, 3000);
})();

/* ============================================
   7. DARK / LIGHT MODE — RIPPLE CONCENTRIC + RAIN
   ============================================ */
(function () {
    const btn = document.getElementById('theme-toggle-btn');
    let isLight = false;
    btn.textContent = '🌙';
    document.querySelector('.av-1').src = 'pva1.jpg';
    document.querySelector('.av-2').src = 'pva.jpg';
    let animating = false;

    function maxR(x, y) {
        const w = window.innerWidth, h = window.innerHeight;
        return Math.ceil(Math.hypot(Math.max(x, w - x), Math.max(y, h - y)));
    }

    btn.addEventListener('click', function () {
        if (animating) return;
        animating = true;

        const rect = btn.getBoundingClientRect();
        const cx = Math.round(rect.left + rect.width / 2);
        const cy = Math.round(rect.top + rect.height / 2);
        const R = maxR(cx, cy);

        isLight = !isLight;
        gIsLight = isLight;

        const styleId = '__vt_style__';
        let st = document.getElementById(styleId);
        if (!st) {
            st = document.createElement('style');
            st.id = styleId;
            document.head.appendChild(st);
        }
        st.textContent = `
            ::view-transition-old(root) { animation: none; z-index: 1; }
            ::view-transition-new(root) { animation: vtExpand 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; z-index: 2; }
            @keyframes vtExpand {
                from { clip-path: circle(0px at ${cx}px ${cy}px); }
                to   { clip-path: circle(${R}px at ${cx}px ${cy}px); }
            }
        `;

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                document.body.classList.toggle('light-mode', isLight);
                btn.textContent = isLight ? '☀️' : '🌙';
                const av1 = document.querySelector('.av-1');
                const av2 = document.querySelector('.av-2');
                if (isLight) {
                    av1.src = 'pva3.jpg';  
                    av2.src = 'pva4.jpg';  
                } else {
                    av1.src = 'pva1.jpg';
                    av2.src = 'pva.jpg';
                }
            }).finished.then(() => { animating = false; });
        } else {
            document.body.classList.toggle('light-mode', isLight);
            btn.textContent = isLight ? '☀️' : '🌙';
            animating = false;
        }
    });
})();

/* ============================================
   8. RAIN DROPS
   ============================================ */
(function () {
    const container = document.getElementById('rain-container');
    if (!container) return;

    for (let i = 0; i < 60; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.cssText = [
            `left: ${Math.random() * 110 - 5}%`,
            `animation-duration: ${(Math.random() * 0.5 + 0.6).toFixed(2)}s`,
            `animation-delay: ${(Math.random() * 2).toFixed(2)}s`,
            `opacity: ${(Math.random() * 0.5 + 0.45).toFixed(2)}`,
            `height: ${Math.floor(Math.random() * 14 + 14)}px`,
        ].join(';');
        container.appendChild(drop);
    }
})();
/* ============================================
   10. 3D CARD TILT
   ============================================ */
(function () {
    const card = document.querySelector('.profile-card');
    if (!card) return;
    const MAX = 8; // độ nghiêng tối đa

    document.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (window.innerWidth / 2);
        const dy = (e.clientY - cy) / (window.innerHeight / 2);
        card.style.transform = `perspective(1200px) rotateY(${dx * MAX}deg) rotateX(${-dy * MAX}deg) scale(1.01)`;
    });
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
    card.style.transition = 'transform 0.08s linear';
})();
/* ============================================
   12. SECTION REVEAL
   ============================================ */
(function () {
    const sections = document.querySelectorAll('.profile-section');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach((s, i) => {
        s.style.transitionDelay = `${i * 0.08}s`;
        obs.observe(s);
    });
})();
/* ============================================
   HOLOGRAPHIC SHINE
   ============================================ */
(function () {
    const card = document.querySelector('.profile-card');
    if (!card) return;
    document.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
        const y = ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%';
        card.style.setProperty('--mx', x);
        card.style.setProperty('--my', y);
    });
})();
/* ============================================
   COPY TO CLIPBOARD (CONTACT)
   ============================================ */
(function () {
    const items = document.querySelectorAll('.contact-item');
    let toast = document.createElement('div');
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
    let timer;

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Lấy text thuần (bỏ icon)
            const raw = item.innerText.trim().split('\n').pop().trim();
            navigator.clipboard.writeText(raw).then(() => {
                clearTimeout(timer);
                toast.textContent = `✓ Copied: ${raw}`;
                toast.classList.add('show');
                timer = setTimeout(() => toast.classList.remove('show'), 2200);
            });
        });
    });
})();
/* ============================================
   SOUND EFFECTS (Web Audio API)
   ============================================ */
(function () {
    let ctx;
    function getCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        return ctx;
    }

    function playTone(freq, type, duration, vol) {
        try {
            const c = getCtx();
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.connect(gain); gain.connect(c.destination);
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, c.currentTime);
            gain.gain.setValueAtTime(vol || 0.06, c.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
            osc.start(c.currentTime);
            osc.stop(c.currentTime + duration);
        } catch(e) {}
    }

    // Hover buttons → subtle beep
    document.querySelectorAll('.btn-pro, .contact-item').forEach(el => {
        el.addEventListener('mouseenter', () => playTone(880, 'sine', 0.08, 0.04));
    });

    // Click → confirm tone
    document.querySelectorAll('.btn-pro').forEach(el => {
        el.addEventListener('click', () => {
            playTone(660, 'square', 0.06, 0.05);
            setTimeout(() => playTone(880, 'square', 0.1, 0.04), 60);
        });
    });

    // Theme toggle → sweep
    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
        [440, 550, 660, 880].forEach((f, i) => setTimeout(() => playTone(f, 'sine', 0.15, 0.05), i * 60));
    });
})();
/* ============================================
   NAME SCRAMBLE ON HOVER
   ============================================ */
(function () {
    const el = document.querySelector('.profile-name');
    if (!el) return;

    const originalName = el.textContent.trim();
    const aliasName = "t0iy3uch1k4"; // Bro điền tên biến hình vào đây

    el.addEventListener('dblclick', () => {
        // Nếu đang là tên gốc thì đổi sang tên mới, ngược lại thì về tên gốc
        el.textContent = (el.textContent.trim() === originalName) ? aliasName : originalName;
    });
})();
/* ============================================
   IDLE AVATAR HEARTBEAT
   ============================================ */
(function () {
    const container = document.querySelector('.avatar-glitch-container');
    if (!container) return;
    let idleTimer;

    const beat = () => {
        container.style.transition = 'transform 0.1s ease';
        const frames = [
            [0, 'scale(1.08)'],
            [120, 'scale(1)'],
            [240, 'scale(1.05)'],
            [360, 'scale(1)'],
        ];
        frames.forEach(([delay, val]) => {
            setTimeout(() => container.style.transform = val, delay);
        });
        setTimeout(() => container.style.transform = '', 500);
    };

    const resetTimer = () => {
        clearInterval(idleTimer);
        idleTimer = setInterval(beat, 3000);
    };

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    resetTimer();
})();
(function () {
    const icon = document.getElementById('vibe-icon');
    const text = document.getElementById('vibe-text');
    if (!icon || !text) return;

    const vibes = [
        { h: [0, 5],   t: 'Sleep' },
        { h: [6, 11],   t: 'Learning' },
        { h: [12, 13], t: 'Eat & Sleep' },
        { h: [14, 17], t: 'Learning, Coding' },
        { h: [18, 20], t: 'Gaming' },
        { h: [21, 23], t: 'Chilling' },
    ];

    const h = new Date().getHours();
    const vibe = vibes.find(v => h >= v.h[0] && h <= v.h[1]) || vibes[0];
    icon.textContent = vibe.i;
    text.textContent = vibe.t;
})();   
