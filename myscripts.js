
(function() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx    = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const CHARS   = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>{}[]()#@$%^&*';
    const FS      = 14;
    let   cols    = [];

    function initCols() {
        const n = Math.floor(canvas.width / FS);
        cols = Array.from({ length: n }, () => Math.random() * -(canvas.height / FS) * 2);
    }
    initCols();
    window.addEventListener('resize', initCols);

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = FS + 'px monospace';

        cols.forEach((y, i) => {
            const x = i * FS;

            
            const alpha = Math.max(0, 0.8 - (y / (canvas.height / FS)) * 0.4);
            ctx.fillStyle = `rgba(180, 130, 255, ${alpha * 0.7})`;
            ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y * FS);

            
            ctx.fillStyle = `rgba(230, 210, 255, ${alpha})`;
            ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y + 1) * FS);

            cols[i]++;
            if (y * FS > canvas.height && Math.random() > 0.975) cols[i] = 0;
        });
    }

    setInterval(draw, 48);
})();



(function() {
    document.addEventListener('mousemove', (e) => {
        const p = document.createElement('div');
        p.className = 'trail-particle';
        const size = Math.random() * 8 + 3;
        Object.assign(p.style, {
            width:  size + 'px',
            height: size + 'px',
            left:   (e.clientX - size / 2) + 'px',
            top:    (e.clientY - size / 2) + 'px',
            opacity: '0.8'
        });
        document.body.appendChild(p);

        
        requestAnimationFrame(() => {
            p.style.opacity   = '0';
            p.style.transform = `scale(0.1) translate(${(Math.random()-0.5)*30}px, ${(Math.random()-0.5)*30}px)`;
        });

        setTimeout(() => p.remove(), 600);
    });
})();



(function() {
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

        if (deleting) {
            el.textContent = cur.substring(0, --charIdx);
        } else {
            el.textContent = cur.substring(0, ++charIdx);
        }

        let delay = deleting ? 45 : 90;

        if (!deleting && charIdx === cur.length) {
            delay = 1800;
            deleting = true;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            lineIdx = (lineIdx + 1) % lines.length;
            delay = 300;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 800);
})();



(function() {
    const section = document.getElementById('terminal-skills');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                }, i * 180);
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.25 });

    
    observer.observe(section);
    
    setTimeout(() => {
        section.querySelectorAll('.skill-fill').forEach((bar, i) => {
            if (bar.style.width === '') {
                setTimeout(() => { bar.style.width = bar.dataset.width; }, i * 180);
            }
        });
    }, 1200);
})();



(function() {
    const latEl  = document.getElementById('sys-lat');
    const timeEl = document.getElementById('sys-time');

    function updateTime() {
        const now = new Date();
        const hh  = String(now.getHours()).padStart(2,'0');
        const mm  = String(now.getMinutes()).padStart(2,'0');
        const ss  = String(now.getSeconds()).padStart(2,'0');
        timeEl.textContent = `${hh}:${mm}:${ss}`;
    }

    function pingLat() {
        const fake = Math.floor(Math.random() * 30 + 5);
        latEl.textContent = `LAT:${fake}ms`;
    }

    updateTime();
    setInterval(updateTime, 1000);
    setInterval(pingLat,   3000);
})();



(function() {
    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                 'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;

    document.addEventListener('keydown', (e) => {
        idx = (e.key === SEQ[idx]) ? idx + 1 : (e.key === SEQ[0] ? 1 : 0);
        if (idx === SEQ.length) {
            idx = 0;
            activateKonami();
        }
    });

    function activateKonami() {
        
        document.body.style.animation = 'rainbowFlash 0.5s ease 6';
        setTimeout(() => { document.body.style.animation = ''; }, 3200);

        
        const av = document.querySelector('.avatar-glitch-container');
        if (av) {
            av.style.animation = 'spin360 0.8s cubic-bezier(0.68,-0.55,0.265,1.55) 3';
            setTimeout(() => { av.style.animation = ''; }, 2600);
        }

        
        const ghost = document.createElement('div');
        ghost.className = 'konami-toast';
        ghost.textContent = '[ KONAMI ACTIVATED — YOU FOUND IT 👾 ]';
        document.body.appendChild(ghost);
        setTimeout(() => ghost.remove(), 3000);
    }
})();

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