/* ============================================
   BEADS & BRAIN — Interactive Abacus Component
   A fully functional virtual soroban/abacus
   ============================================ */

const AbacusComponent = {
    instances: {},

    /**
     * Create an abacus in the specified container
     * @param {string} containerId - ID of the container element
     * @param {object} options - { rods: number, mini: boolean, readonly: boolean }
     */
    create(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const rods = options.rods || 13;
        const mini = options.mini || false;
        const readonly = options.readonly || false;

        // Initialize state: each rod has { heaven: 0, earth: 0 }
        // heaven = 0 (up/inactive) or 1 (down/active = worth 5)
        // earth = 0-4 (number of earth beads pushed up/active, each worth 1)
        const state = [];
        for (let i = 0; i < rods; i++) {
            state.push({ heaven: 0, earth: 0 });
        }

        this.instances[containerId] = { state, rods, container, mini, readonly };

        this.render(containerId);
    },

    render(containerId) {
        const instance = this.instances[containerId];
        if (!instance) return;

        const { state, rods, container, mini } = instance;

        // Labels for rods (place values)
        const labels = [];
        for (let i = 0; i < rods; i++) {
            const power = rods - 1 - i;
            if (power === 0) labels.push('1s');
            else if (power === 1) labels.push('10s');
            else if (power === 2) labels.push('100s');
            else if (power === 3) labels.push('1K');
            else if (power === 4) labels.push('10K');
            else if (power === 5) labels.push('1L');
            else if (power === 6) labels.push('10L');
            else labels.push(`10^${power}`);
        }

        let html = `<div class="abacus-container"><div class="abacus-inner">`;

        for (let i = 0; i < rods; i++) {
            const rod = state[i];
            html += `<div class="abacus-column" data-rod="${i}">`;
            html += `<div class="abacus-rod"></div>`;

            // Heaven section (1 bead)
            html += `<div class="heaven-section">`;
            const heavenActive = rod.heaven === 1;
            html += `<div class="bead heaven-bead ${heavenActive ? 'active' : ''}" 
                         data-rod="${i}" data-type="heaven" 
                         title="Heaven bead (value: 5)"></div>`;
            html += `</div>`;

            // Divider
            html += `<div class="abacus-divider"></div>`;

            // Earth section (4 beads)
            html += `<div class="earth-section">`;
            for (let j = 0; j < 4; j++) {
                const earthActive = j >= (4 - rod.earth);
                html += `<div class="bead earth-bead ${earthActive ? 'active' : ''}" 
                             data-rod="${i}" data-type="earth" data-index="${j}"
                             title="Earth bead (value: 1)"></div>`;
            }
            html += `</div>`;

            // Label
            if (!mini || rods <= 7) {
                html += `<div class="column-label">${labels[i]}</div>`;
            }

            html += `</div>`; // end column
        }

        html += `</div></div>`; // end inner, end container

        container.innerHTML = html;

        // Attach click events
        if (!instance.readonly) {
            container.querySelectorAll('.bead').forEach(bead => {
                bead.addEventListener('click', (e) => {
                    const rodIdx = parseInt(bead.dataset.rod);
                    const type = bead.dataset.type;
                    this.toggleBead(containerId, rodIdx, type);
                });
            });
        }
    },

    toggleBead(containerId, rodIdx, type) {
        const instance = this.instances[containerId];
        if (!instance) return;

        const rod = instance.state[rodIdx];

        if (type === 'heaven') {
            rod.heaven = rod.heaven === 0 ? 1 : 0;
        } else if (type === 'earth') {
            // Cycle: 0 -> 1 -> 2 -> 3 -> 4 -> 0
            rod.earth = (rod.earth + 1) % 5;
        }

        this.render(containerId);
        this.updateDisplay(containerId);

        // Play a subtle click sound effect (visual feedback)
        this.beadClickEffect(containerId, rodIdx);
    },

    beadClickEffect(containerId, rodIdx) {
        const instance = this.instances[containerId];
        if (!instance) return;

        const col = instance.container.querySelector(`[data-rod="${rodIdx}"].abacus-column`);
        if (col) {
            col.style.transform = 'scale(0.95)';
            setTimeout(() => {
                col.style.transform = 'scale(1)';
            }, 100);
        }
    },

    getValue(containerId) {
        const instance = this.instances[containerId];
        if (!instance) return 0;

        let total = 0;
        const { state, rods } = instance;

        for (let i = 0; i < rods; i++) {
            const placeValue = Math.pow(10, rods - 1 - i);
            const rodValue = state[i].heaven * 5 + state[i].earth;
            total += rodValue * placeValue;
        }

        return total;
    },

    setValue(containerId, value) {
        const instance = this.instances[containerId];
        if (!instance) return;

        const { state, rods } = instance;

        // Reset all beads
        for (let i = 0; i < rods; i++) {
            state[i].heaven = 0;
            state[i].earth = 0;
        }

        // Set value from right to left
        let remaining = value;
        for (let i = rods - 1; i >= 0 && remaining > 0; i--) {
            const placeValue = Math.pow(10, rods - 1 - i);
            const digit = Math.floor(remaining / placeValue);
            remaining %= placeValue;

            if (digit >= 5) {
                state[i].heaven = 1;
                state[i].earth = digit - 5;
            } else {
                state[i].heaven = 0;
                state[i].earth = digit;
            }
        }

        this.render(containerId);
        this.updateDisplay(containerId);
    },

    reset(containerId) {
        const instance = this.instances[containerId];
        if (!instance) return;

        for (let i = 0; i < instance.rods; i++) {
            instance.state[i].heaven = 0;
            instance.state[i].earth = 0;
        }

        this.render(containerId);
        this.updateDisplay(containerId);
    },

    updateDisplay(containerId) {
        const display = document.getElementById('abacus-value');
        if (display && containerId === 'main-abacus') {
            const value = this.getValue(containerId);
            display.textContent = value.toLocaleString();

            // Add a pop animation
            display.style.transform = 'scale(1.1)';
            setTimeout(() => {
                display.style.transform = 'scale(1)';
            }, 150);
        }
    },

    setRandomValue(containerId) {
        const instance = this.instances[containerId];
        if (!instance) return;

        const maxDigits = Math.min(instance.rods, 4);
        const max = Math.pow(10, maxDigits) - 1;
        const value = App.randomInt(1, max);
        this.setValue(containerId, value);
    },

    /* ===== PLAYGROUND FUNCTIONALITY ===== */
    setupPlayground() {
        // Reset button
        const resetBtn = document.getElementById('abacus-reset');
        if (resetBtn) {
            resetBtn.onclick = () => this.reset('main-abacus');
        }

        // Challenge button
        const challengeBtn = document.getElementById('abacus-challenge-btn');
        if (challengeBtn) {
            challengeBtn.onclick = () => this.startChallenge();
        }

        // Challenge check
        const checkBtn = document.getElementById('challenge-check');
        if (checkBtn) {
            checkBtn.onclick = () => this.checkChallenge();
        }

        // Challenge skip
        const skipBtn = document.getElementById('challenge-skip');
        if (skipBtn) {
            skipBtn.onclick = () => this.newChallenge();
        }
    },

    challengeTarget: 0,

    startChallenge() {
        const bar = document.getElementById('challenge-bar');
        if (bar) {
            bar.style.display = 'block';
            this.newChallenge();
        }
    },

    newChallenge() {
        this.reset('main-abacus');
        this.challengeTarget = App.randomInt(1, 9999);
        document.getElementById('challenge-target').textContent = this.challengeTarget.toLocaleString();
        const result = document.getElementById('challenge-result');
        if (result) {
            result.textContent = '';
            result.className = 'challenge-result';
        }
    },

    checkChallenge() {
        const current = this.getValue('main-abacus');
        const result = document.getElementById('challenge-result');
        if (!result) return;

        if (current === this.challengeTarget) {
            result.textContent = '🎉 Correct! Amazing job!';
            result.className = 'challenge-result correct';
            // Auto new challenge after 1.5s
            setTimeout(() => this.newChallenge(), 1500);
        } else {
            result.textContent = `❌ Not quite! Your value is ${current.toLocaleString()}. Try again!`;
            result.className = 'challenge-result incorrect';
        }
    }
};
