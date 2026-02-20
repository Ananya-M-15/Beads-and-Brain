/* ============================================
   BEADS & BRAIN — Practice Sheets Module
   Generate and download printable worksheets
   ============================================ */

const Practice = {
    initialized: false,
    currentDifficulty: 'beginner',
    currentType: 'numbers',

    init() {
        if (this.initialized) return;
        this.setupControls();
        this.initialized = true;
    },

    setupControls() {
        // Difficulty buttons
        document.querySelectorAll('#difficulty-group .btn-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#difficulty-group .btn-toggle').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentDifficulty = btn.dataset.level;
            });
        });

        // Type buttons
        document.querySelectorAll('#type-group .btn-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#type-group .btn-toggle').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentType = btn.dataset.type;
            });
        });

        // Generate button
        const genBtn = document.getElementById('generate-sheet');
        if (genBtn) {
            genBtn.addEventListener('click', () => this.generateSheet());
        }

        // Download button
        const dlBtn = document.getElementById('download-sheet');
        if (dlBtn) {
            dlBtn.addEventListener('click', () => this.downloadSheet());
        }
    },

    generateSheet() {
        const count = parseInt(document.getElementById('question-count').value);
        const questions = this.createQuestions(this.currentType, this.currentDifficulty, count);
        this.renderSheet(questions);

        // Show download button
        const dlBtn = document.getElementById('download-sheet');
        if (dlBtn) dlBtn.style.display = 'inline-flex';
    },

    createQuestions(type, difficulty, count) {
        const questions = [];
        const range = this.getRange(difficulty);

        for (let i = 0; i < count; i++) {
            let question;

            switch (type) {
                case 'numbers':
                    question = this.createNumberQuestion(range);
                    break;
                case 'addition':
                    question = this.createAdditionQuestion(range);
                    break;
                case 'subtraction':
                    question = this.createSubtractionQuestion(range);
                    break;
                case 'mixed':
                    const types = ['addition', 'subtraction'];
                    const randomType = types[Math.floor(Math.random() * types.length)];
                    if (randomType === 'addition') {
                        question = this.createAdditionQuestion(range);
                    } else {
                        question = this.createSubtractionQuestion(range);
                    }
                    break;
                default:
                    question = this.createNumberQuestion(range);
            }
            questions.push(question);
        }
        return questions;
    },

    getRange(difficulty) {
        switch (difficulty) {
            case 'beginner':
                return { min: 1, max: 9, operandMax: 5 };
            case 'intermediate':
                return { min: 1, max: 99, operandMax: 50 };
            case 'advanced':
                return { min: 10, max: 999, operandMax: 500 };
            default:
                return { min: 1, max: 9, operandMax: 5 };
        }
    },

    createNumberQuestion(range) {
        const num = App.randomInt(range.min, range.max);
        return {
            type: 'number',
            problem: `Show ${num} on the abacus`,
            display: `${num}`,
            answer: num
        };
    },

    createAdditionQuestion(range) {
        const a = App.randomInt(range.min, range.operandMax);
        const b = App.randomInt(range.min, range.operandMax);
        return {
            type: 'addition',
            problem: `${a} + ${b} = ?`,
            display: `${a} + ${b}`,
            answer: a + b
        };
    },

    createSubtractionQuestion(range) {
        let a = App.randomInt(range.min, range.max);
        let b = App.randomInt(range.min, Math.min(a, range.operandMax));
        if (b > a) [a, b] = [b, a]; // ensure positive result
        return {
            type: 'subtraction',
            problem: `${a} − ${b} = ?`,
            display: `${a} − ${b}`,
            answer: a - b
        };
    },

    renderSheet(questions) {
        const preview = document.getElementById('sheet-preview');
        if (!preview) return;

        const diffLabel = {
            beginner: '🌱 Beginner',
            intermediate: '🌿 Intermediate',
            advanced: '🌳 Advanced'
        }[this.currentDifficulty];

        const typeLabel = {
            numbers: '🔢 Number Recognition',
            addition: '➕ Addition',
            subtraction: '➖ Subtraction',
            mixed: '🔀 Mixed Operations'
        }[this.currentType];

        const typeInstruction = {
            numbers: 'Show these numbers on the abacus. Write the bead positions.',
            addition: 'Solve these addition problems using the abacus.',
            subtraction: 'Solve these subtraction problems using the abacus.',
            mixed: 'Solve these problems using the abacus.'
        }[this.currentType];

        preview.innerHTML = `
            <div class="practice-sheet" id="printable-sheet">
                <div class="sheet-header">
                    <h2>🧮 Beads & Brain — Practice Sheet</h2>
                    <div class="sheet-meta">${diffLabel} • ${typeLabel} • ${questions.length} Questions</div>
                    <div class="sheet-name-field">
                        <span>Name:</span>
                        <hr class="sheet-name-line">
                        <span>Date:</span>
                        <hr class="sheet-name-line" style="max-width: 150px;">
                    </div>
                    <p style="margin-top: 12px; font-size: 14px; color: var(--text-muted);">
                        <em>${typeInstruction}</em>
                    </p>
                </div>
                <div class="questions-grid">
                    ${questions.map((q, i) => `
                        <div class="question-box">
                            <div class="question-number">Q${i + 1}</div>
                            <div class="question-problem">${q.display}</div>
                            <div class="question-answer-line"></div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 32px; padding-top: 20px; border-top: 2px dashed var(--border); text-align: center;">
                    <p style="font-size: 14px; color: var(--text-muted);">
                        <strong>Answer Key (fold before giving to student):</strong><br>
                        ${questions.map((q, i) => `Q${i + 1}: ${q.answer}`).join(' | ')}
                    </p>
                </div>
            </div>
        `;

        // Track sheets generated
        App.incrementSheets();
    },

    downloadSheet() {
        // Use browser print for PDF download
        const sheet = document.getElementById('printable-sheet');
        if (!sheet) return;

        // Open a new window with just the sheet content for clean printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Beads & Brain - Practice Sheet</title>
                <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { 
                        font-family: 'Nunito', sans-serif; 
                        padding: 20px;
                        color: #2D1B69;
                    }
                    h2 { font-family: 'Fredoka', sans-serif; font-size: 24px; margin-bottom: 4px; }
                    .sheet-header { text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 3px dashed #ddd; }
                    .sheet-meta { font-size: 13px; color: #8B7DB5; margin-top: 4px; }
                    .sheet-name-field { display: flex; align-items: center; gap: 12px; margin-top: 16px; justify-content: center; }
                    .sheet-name-field span { font-size: 14px; font-weight: 700; }
                    .sheet-name-line { flex: 1; max-width: 200px; border: none; border-bottom: 2px solid #333; height: 1px; }
                    .questions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
                    .question-box { border: 2px solid #ddd; border-radius: 12px; padding: 14px; text-align: center; }
                    .question-number { font-size: 10px; color: #999; font-weight: 700; margin-bottom: 4px; }
                    .question-problem { font-family: 'Fredoka', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
                    .question-answer-line { width: 60px; height: 2px; background: #999; margin: 0 auto; }
                    @media print {
                        body { padding: 10px; }
                        .question-box { break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${sheet.innerHTML}
                <script>
                    setTimeout(() => { window.print(); }, 500);
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
};
