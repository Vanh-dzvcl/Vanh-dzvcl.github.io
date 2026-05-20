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
        { t: '> Initializing PVA_OS v2.0.7...', c: '#b482ff' },
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
        'CS2 / AOV Enjoyer',
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
   5. KONAMI CODE (MATRIX TEXT TRIGGER)
   ============================================ */
(function () {
    const SEQ = ['w', 'a', 's', 'd'];
    let idx = 0;

    document.addEventListener('keydown', (e) => {
        idx = (e.key === SEQ[idx]) ? idx + 1 : (e.key === SEQ[0] ? 1 : 0);
        if (idx === SEQ.length) {
            idx = 0;
            activateKonami();
        }
    });

    function activateKonami() {
        // Flash màn hình & xoay avatar
        document.body.style.animation = 'rainbowFlash 0.5s ease 6';
        setTimeout(() => { document.body.style.animation = ''; }, 3200);

        const av = document.querySelector('.avatar-glitch-container');
        if (av) {
            av.style.animation = 'spin360 0.8s cubic-bezier(0.68,-0.55,0.265,1.55) 3';
            setTimeout(() => { av.style.animation = ''; }, 2600);
        }

        // Hiện chữ ẩn
        const ghost = document.createElement('div');
        ghost.className = 'konami-toast';
        document.body.appendChild(ghost);
        setTimeout(() => ghost.remove(), 5000); 

        const mc = document.getElementById('matrix-canvas');
        const overlay = document.querySelector('.overlay');
        const btn = document.getElementById('theme-toggle-btn');

        const rect = btn.getBoundingClientRect();
        const cx = Math.round(rect.left + rect.width / 2);
        const cy = Math.round(rect.top + rect.height / 2);
        const R = Math.ceil(Math.hypot(
            Math.max(cx, window.innerWidth - cx),
            Math.max(cy, window.innerHeight - cy)
        ));

        // Bung canvas che toàn màn hình
        mc.style.setProperty('opacity', '1', 'important');
        mc.style.setProperty('z-index', '99999', 'important');
        mc.style.transition = 'clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        mc.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

        requestAnimationFrame(() => requestAnimationFrame(() => {
            mc.style.clipPath = `circle(${R}px at ${cx}px ${cy}px)`;
        }));
        if (overlay) overlay.style.opacity = '0';

        // Thu hồi lại mọi thứ sau 6 giây
        setTimeout(() => {
            mc.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

            setTimeout(() => {
                mc.style.removeProperty('opacity');
                mc.style.removeProperty('z-index');
                mc.style.transition = '';
                mc.style.clipPath = '';
                if (overlay) overlay.style.opacity = '';
            }, 650);
        }, 6000); 
    }
})();

/* ============================================
   6. MINI TERMINAL
   ============================================ */
(function () {
    const out = document.getElementById('mini-term-output');
    if (!out) return;

    const lines = [
        { html: '<span class="t-include">#include</span> <span class="t-string">&lt;iostream&gt;</span>', plain: '#include <iostream>', type: true },
        { html: '<span class="t-keyword">using namespace</span> std;', plain: 'using namespace std;', type: true },
        { html: '<span class="t-keyword">int</span> <span class="t-func">main</span>() {', plain: 'int main() {', type: true },
        { html: '&nbsp;&nbsp;cout <span class="t-keyword">&lt;&lt;</span> <span class="t-string">"Phan Viet Anh"</span>;', plain: '  cout << "Phan Viet Anh";', type: true },
        { html: '}', plain: '}', type: true },
        { html: '<span class="t-comment">$ g++ main.cpp && ./a.out</span>', plain: null, type: false },
        { html: '<span class="t-output">&gt; Phan Viet Anh</span>', plain: null, type: false },
    ];

    let li = 0;

    function typeLine(rowEl, line, callback) {
        const plain = line.plain;
        let ci = 0;
        function typeChar() {
            if (ci >= plain.length) {
                rowEl.innerHTML = line.html;
                setTimeout(callback, 200);
                return;
            }
            const cursor = document.createElement('span');
            cursor.className = 't-cursor';
            rowEl.textContent = plain.substring(0, ++ci);
            rowEl.appendChild(cursor);
            setTimeout(typeChar, 50);
        }
        typeChar();
    }

    function nextLine() {
        if (li >= lines.length) {
            setTimeout(() => { out.innerHTML = ''; li = 0; setTimeout(nextLine, 400); }, 3000);
            return;
        }
        const row = document.createElement('div');
        out.appendChild(row);
        const line = lines[li];

        if (line.type) {
            typeLine(row, line, () => { li++; setTimeout(nextLine, 150); });
        } else {
            row.innerHTML = line.html;
            li++;
            setTimeout(nextLine, li === 5 ? 600 : 300);
        }
    }
    setTimeout(nextLine, 800);
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
   XP BAR FILL ON LOAD
   ============================================ */
(function () {
    const fill = document.querySelector('.xp-bar-fill');
    if (!fill) return;
    setTimeout(() => {
        fill.style.width = fill.dataset.xp + '%';
    }, 1800); // chờ boot screen xong
})();
/* ============================================
   NAME SCRAMBLE ON HOVER
   ============================================ */
(function () {
    const el = document.querySelector('.profile-name');
    if (!el) return;
    const original = el.textContent;
    // Bảng chữ cái rác để nó random
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    let frame;

    // Khi bro đút chuột vào -> Khởi động động cơ giật
    el.addEventListener('mouseenter', () => {
        // Tránh tình trạng trỏ chuột ra vào liên tục bị lỗi đè lặp (spam interval)
        clearInterval(frame);
        
        el.classList.add('scrambling'); // Bật css nhòe màu

        // Cho nó random kí tự liên tục mãi mãi
        frame = setInterval(() => {
            el.textContent = original.split('').map(ch => {
                if (ch === ' ') return ' '; // Dấu cách thì giữ nguyên cho có form
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');
        }, 45); // Tốc độ giật 45ms (càng nhỏ giật càng kinh)
    });

    // Khi bro rút chuột ra -> Trả lại tên thật, ngưng tấu hề
    el.addEventListener('mouseleave', () => {
        clearInterval(frame); // Rút phích cắm
        el.textContent = original; // Trả lại tên đẹp trai
        el.classList.remove('scrambling'); // Tắt css nhòe màu
    });
})();
/* ============================================
   SKILL BARS ANIMATE ON SCROLL
   ============================================ */
(function () {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 200);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    fills.forEach(f => obs.observe(f));
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
/* ============================================
   DOUBLE CLICK NAME → GLITCH STORM
   ============================================ */
(function () {
    const name = document.querySelector('.profile-name');
    const sidebar = document.querySelector('.profile-sidebar');
    if (!name || !sidebar) return;

    name.addEventListener('dblclick', () => {
        sidebar.style.animation = 'sidebarStorm 0.08s steps(1) infinite';
        const style = document.createElement('style');
        style.id = 'storm-style';
        style.textContent = `
            @keyframes sidebarStorm {
                0%  { filter:none; transform:none; }
                10% { filter:hue-rotate(90deg) invert(0.1); transform:translate(-3px,1px); }
                20% { filter:brightness(1.8) saturate(3); transform:translate(3px,-2px); }
                30% { filter:hue-rotate(180deg); transform:translate(-1px,3px) skewX(2deg); }
                40% { filter:none; transform:translate(2px,0); }
                50% { filter:invert(0.05) brightness(1.4); transform:translate(-2px,-1px) skewX(-1deg); }
                60% { filter:hue-rotate(270deg) saturate(2); transform:translate(1px,2px); }
                70% { filter:none; transform:none; }
                80% { filter:brightness(2); transform:translate(-3px,-3px); }
                90% { filter:hue-rotate(45deg); transform:translate(2px,1px) skewY(1deg); }
                100% { filter:none; transform:none; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            sidebar.style.animation = '';
            document.getElementById('storm-style')?.remove();
        }, 1500);
    });
})();
/* ============================================
   VIBE STATUS (time-based)
   ============================================ */
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
/* ============================================
   STATS COUNTER ANIMATE
   ============================================ */
(function () {
    const cards = document.querySelectorAll('.stat-value');
    if (!cards.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Chưa lướt tới thì nghỉ
            if (!entry.isIntersecting) return;
            
            const el = entry.target;

            // Lọc tạp chất, nhổ sạch dấu phẩy/chữ cái ra khỏi số
            const rawTarget = el.dataset.target ? el.dataset.target.replace(/,/g, '') : "0";
            const target = parseInt(rawTarget) || 0; // || 0 để né quả NaN chí mạng
            
            const duration = 1600; // Tốc độ animation 1.6s
            const start = performance.now();

            function tick(now) {
                // Ép p không bao giờ được âm (khắc phục lỗi frame đầu tiên)
                const p = Math.max(0, Math.min((now - start) / duration, 1));
                
                // Công thức easeOutExpo (chạy nhanh lúc đầu, rà phanh lúc sau)
                const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
                
                // Hàm format tiền tỷ
                function fmtNum(n) {
                    // Dùng cái này nó tự phẩy cho hàng nghìn, hàng triệu luôn: 75,696
                    return n.toLocaleString('en-US'); 
                }

                // Gắn số vào màn hình
                el.textContent = fmtNum(Math.floor(ease * target));
                
                if (p < 1) {
                    requestAnimationFrame(tick); // Chưa đủ thời gian thì chạy tiếp
                } else {
                    el.textContent = fmtNum(target); // Chốt sổ 100% khi kết thúc
                }
            }
            
            requestAnimationFrame(tick);
            obs.unobserve(el); // Chạy 1 lần rồi phắn. Muốn lướt lên lướt xuống nó giật lại thì xóa dòng này đi!
        });
    }, { threshold: 0.4 }); // Phải lướt qua 40% phần tử nó mới kích hoạt

    cards.forEach(c => obs.observe(c));
})();

/* ============================================
   ACHIEVEMENT BADGE TOOLTIP + UNLOCK PULSE
   ============================================ */
(function () {
    const tip = document.getElementById('badge-tip');
    if (!tip) return;

    document.querySelectorAll('.badge-card.unlocked').forEach(card => {
        card.addEventListener('mouseenter', e => {
            tip.textContent = card.dataset.tip || '';
            tip.style.opacity = '1';
        });
        card.addEventListener('mousemove', e => {
            tip.style.left = (e.clientX + 14) + 'px';
            tip.style.top  = (e.clientY - 32) + 'px';
        });
        card.addEventListener('mouseleave', () => {
            tip.style.opacity = '0';
        });
    });

    // Pulse animation cho unlocked badges khi vào viewport
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const cards = entry.target.querySelectorAll('.badge-card.unlocked');
            cards.forEach((c, i) => {
                setTimeout(() => {
                    c.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                    c.style.transform = 'scale(1.08)';
                    c.style.boxShadow = '0 0 18px rgba(180,130,255,0.35)';
                    setTimeout(() => {
                        c.style.transform = '';
                        c.style.boxShadow = '';
                    }, 220);
                }, i * 120);
            });
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    const grid = document.querySelector('.badge-grid');
    if (grid) obs.observe(grid);
})();