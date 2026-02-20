/* ============================================
   BEADS & BRAIN — Main Application Controller
   Handles routing, navigation, and common utilities
   ============================================ */

const App = {
    currentPage: 'home',
    progressData: null,

    init() {
        this.loadProgress();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());

        // Initialize hero abacus
        setTimeout(() => {
            if (typeof AbacusComponent !== 'undefined') {
                AbacusComponent.create('hero-abacus', { rods: 7, mini: true, readonly: false });
                // Set some beads for visual appeal
                AbacusComponent.setRandomValue('hero-abacus');
            }
        }, 300);

        console.log('🧮 Beads & Brain initialized!');

        // Password strength indicator
        const signupPw = document.getElementById('signup-password');
        if (signupPw) {
            signupPw.addEventListener('input', () => {
                const val = signupPw.value;
                const fill = document.getElementById('strength-fill');
                const text = document.getElementById('strength-text');
                if (!fill || !text) return;
                let score = 0;
                if (val.length >= 6) score++;
                if (val.length >= 10) score++;
                if (/[A-Z]/.test(val)) score++;
                if (/[0-9]/.test(val)) score++;
                if (/[^A-Za-z0-9]/.test(val)) score++;
                const levels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
                const colors = ['', '#FF6B6B', '#FF8A5C', '#FFE66D', '#51CF66', '#4ECDC4'];
                fill.style.width = (score * 20) + '%';
                fill.style.background = colors[score] || '';
                text.textContent = levels[score] || '';
                text.style.color = colors[score] || '';
            });
        }
    },

    /* ===== NAVIGATION ===== */
    navigate(page) {
        if (this.currentPage === page) return;

        // Update URL hash
        window.location.hash = page;
    },

    handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'home';
        const validPages = ['home', 'learn', 'tutorials', 'practice', 'exam', 'progress', 'login', 'signup'];
        const page = validPages.includes(hash) ? hash : 'home';
        this.showPage(page);
    },

    showPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        // Show target page
        const target = document.getElementById(`page-${page}`);
        if (target) {
            target.classList.add('active');
            // Re-trigger animation
            target.style.animation = 'none';
            target.offsetHeight; // trigger reflow
            target.style.animation = '';
        }

        // Update nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Close mobile menu
        document.getElementById('nav-links')?.classList.remove('open');
        document.getElementById('nav-toggle')?.classList.remove('active');

        this.currentPage = page;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Initialize page-specific content
        this.initPage(page);
    },

    initPage(page) {
        switch (page) {
            case 'learn':
                if (typeof AbacusComponent !== 'undefined') {
                    AbacusComponent.create('main-abacus', { rods: 13, mini: false });
                    AbacusComponent.setupPlayground();
                }
                break;
            case 'tutorials':
                if (typeof Tutorials !== 'undefined') Tutorials.init();
                break;
            case 'practice':
                if (typeof Practice !== 'undefined') Practice.init();
                break;
            case 'exam':
                if (typeof Exam !== 'undefined') Exam.init();
                break;
            case 'progress':
                this.renderProgress();
                break;
        }
    },

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page) this.navigate(page);
            });
        });
    },

    setupMobileMenu() {
        const toggle = document.getElementById('nav-toggle');
        const links = document.getElementById('nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                links.classList.toggle('open');
            });
        }
    },

    setupScrollEffect() {
        const nav = document.getElementById('main-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }
        });
    },

    /* ===== PROGRESS & STORAGE ===== */
    loadProgress() {
        const saved = localStorage.getItem('beads_brain_progress');
        this.progressData = saved ? JSON.parse(saved) : {
            totalExams: 0,
            totalStars: 0,
            bestScore: 0,
            sheetsPrinted: 0,
            examHistory: [],
            badges: [],
            completedLessons: [],
            levelHighScores: {}
        };
    },

    saveProgress() {
        localStorage.setItem('beads_brain_progress', JSON.stringify(this.progressData));
    },

    addExamResult(result) {
        this.progressData.totalExams++;
        this.progressData.totalStars += result.stars;
        if (result.percentage > this.progressData.bestScore) {
            this.progressData.bestScore = result.percentage;
        }

        // Track high score per level
        const levelKey = `level_${result.level}`;
        if (!this.progressData.levelHighScores[levelKey] ||
            result.percentage > this.progressData.levelHighScores[levelKey]) {
            this.progressData.levelHighScores[levelKey] = result.percentage;
        }

        this.progressData.examHistory.unshift({
            level: result.level,
            score: result.score,
            total: result.total,
            percentage: result.percentage,
            stars: result.stars,
            time: result.time,
            date: new Date().toISOString()
        });

        // Keep only last 50 exams
        if (this.progressData.examHistory.length > 50) {
            this.progressData.examHistory = this.progressData.examHistory.slice(0, 50);
        }

        // Check badges
        this.checkBadges(result);
        this.saveProgress();
    },

    incrementSheets() {
        this.progressData.sheetsPrinted++;
        // Check practice pro badge
        if (this.progressData.sheetsPrinted >= 5 && !this.progressData.badges.includes('practice-pro')) {
            this.progressData.badges.push('practice-pro');
        }
        this.saveProgress();
    },

    completeLesson(lessonId) {
        if (!this.progressData.completedLessons.includes(lessonId)) {
            this.progressData.completedLessons.push(lessonId);
            this.saveProgress();
        }
    },

    checkBadges(result) {
        const b = this.progressData.badges;
        // First exam
        if (this.progressData.totalExams >= 1 && !b.includes('first-exam')) {
            b.push('first-exam');
        }
        // Perfect score
        if (result.percentage === 100 && !b.includes('perfect-score')) {
            b.push('perfect-score');
        }
        // Speed demon (under 30 seconds for 10 questions)
        if (result.time <= 30 && result.total >= 10 && result.percentage >= 80 && !b.includes('speed-demon')) {
            b.push('speed-demon');
        }
        // Level master (complete all 5 levels with at least 70%)
        const hs = this.progressData.levelHighScores;
        const allLevelsComplete = [1, 2, 3, 4, 5].every(l => (hs[`level_${l}`] || 0) >= 70);
        if (allLevelsComplete && !b.includes('level-master')) {
            b.push('level-master');
        }
        // Abacus hero (10+ exams, average above 80%)
        if (this.progressData.totalExams >= 10) {
            const avgScore = this.progressData.examHistory.reduce((s, e) => s + e.percentage, 0) / this.progressData.examHistory.length;
            if (avgScore >= 80 && !b.includes('abacus-hero')) {
                b.push('abacus-hero');
            }
        }
    },

    renderProgress() {
        const p = this.progressData;

        // Update stat cards
        document.getElementById('total-exams').textContent = p.totalExams;
        document.getElementById('total-stars').textContent = p.totalStars;
        document.getElementById('best-score').textContent = p.bestScore + '%';
        document.getElementById('sheets-done').textContent = p.sheetsPrinted;

        // Update badges
        document.querySelectorAll('.badge-item').forEach(badge => {
            const id = badge.dataset.badge;
            if (p.badges.includes(id)) {
                badge.classList.remove('locked');
                badge.classList.add('unlocked');
            } else {
                badge.classList.add('locked');
                badge.classList.remove('unlocked');
            }
        });

        // Render history
        const historyList = document.getElementById('history-list');
        if (p.examHistory.length === 0) {
            historyList.innerHTML = `
                <div class="history-empty">
                    <p>No exams taken yet. Start your first exam to see your progress here!</p>
                    <button class="btn btn-primary" onclick="App.navigate('exam')">🎯 Take an Exam</button>
                </div>`;
        } else {
            historyList.innerHTML = p.examHistory.map(e => {
                const date = new Date(e.date);
                const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                const stars = '⭐'.repeat(e.stars);
                return `
                    <div class="history-item">
                        <div class="history-left">
                            <div class="history-level">${e.level}</div>
                            <div class="history-info">
                                <h4>Level ${e.level} Exam</h4>
                                <p>${dateStr} • ${e.time}s</p>
                            </div>
                        </div>
                        <div class="history-right">
                            <div class="history-score">${e.score}/${e.total}</div>
                            <div class="history-stars">${stars}</div>
                        </div>
                    </div>`;
            }).join('');
        }

        // Reset progress button
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (confirm('Are you sure you want to reset all your progress? This cannot be undone!')) {
                    localStorage.removeItem('beads_brain_progress');
                    this.loadProgress();
                    this.renderProgress();
                }
            };
        }
    },

    /* ===== CONFETTI ===== */
    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#6C63FF', '#4ECDC4', '#FF8A5C', '#FF6B9D', '#FFE66D', '#51CF66', '#FF6B6B'];
        const particles = [];

        for (let i = 0; i < 120; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20 - 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.3 + Math.random() * 0.2,
                opacity: 1,
                shape: Math.random() > 0.5 ? 'circle' : 'rect'
            });
        }

        let frame = 0;
        const maxFrames = 150;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.99;
                p.rotation += p.rotSpeed;
                p.opacity = Math.max(0, 1 - frame / maxFrames);

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                }

                ctx.restore();
            });

            frame++;
            if (frame < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        animate();
    },

    /* ===== UTILITY ===== */
    shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /* ===== AUTH HANDLERS ===== */
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Simulate login
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerHTML = '⏳ Logging in...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '✅ Success!';
            setTimeout(() => {
                this.navigate('home');
                btn.innerHTML = '🔑 Login to My Account';
                btn.disabled = false;
            }, 800);
        }, 1200);
        return false;
    },

    handleSignup(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerHTML = '⏳ Creating account...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '🎉 Account Created!';
            this.launchConfetti();
            setTimeout(() => {
                this.navigate('home');
                btn.innerHTML = '✨ Create My Account';
                btn.disabled = false;
            }, 1200);
        }, 1500);
        return false;
    },

    togglePassword(inputId, btn) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
        } else {
            input.type = 'password';
            btn.textContent = '👁️';
        }
    },

    socialLogin(provider) {
        alert(`${provider} login coming soon! 🚀`);
    },

    handleNewsletter(e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const btn = e.target.querySelector('button');
        btn.innerHTML = '✓';
        input.value = '';
        setTimeout(() => { btn.innerHTML = '→'; }, 2000);
        return false;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
