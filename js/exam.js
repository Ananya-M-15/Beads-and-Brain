/* ============================================
   BEADS & BRAIN — Exam Module
   Timed quizzes with scoring and progress tracking
   ============================================ */

const Exam = {
    initialized: false,
    currentLevel: null,
    questions: [],
    currentQuestion: 0,
    score: 0,
    timer: null,
    startTime: null,
    elapsedSeconds: 0,
    totalQuestions: 10,
    answeredQuestions: [],
    isExamActive: false,

    init() {
        if (!this.initialized) {
            this.setupLevelCards();
            this.setupQuitButton();
            this.initialized = true;
        }
        // Always show setup when navigating to exam
        if (!this.isExamActive) {
            this.showSetup();
        }
    },

    setupLevelCards() {
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = parseInt(card.dataset.level);
                this.startExam(level);
            });
        });
    },

    setupQuitButton() {
        const quitBtn = document.getElementById('exam-quit');
        if (quitBtn) {
            quitBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to quit this exam?')) {
                    this.endExam();
                }
            });
        }
    },

    showSetup() {
        document.getElementById('exam-setup').style.display = 'block';
        document.getElementById('exam-active').style.display = 'none';
        document.getElementById('exam-results').style.display = 'none';
    },

    startExam(level) {
        this.currentLevel = level;
        this.questions = this.generateQuestions(level);
        this.currentQuestion = 0;
        this.score = 0;
        this.answeredQuestions = [];
        this.elapsedSeconds = 0;
        this.isExamActive = true;

        // Hide setup, show active
        document.getElementById('exam-setup').style.display = 'none';
        document.getElementById('exam-active').style.display = 'block';
        document.getElementById('exam-results').style.display = 'none';

        // Update UI
        document.getElementById('exam-level-badge').textContent = `Level ${level}`;
        document.getElementById('exam-score').textContent = '0';

        // Start timer
        this.startTime = Date.now();
        this.startTimer();

        // Show first question
        this.showQuestion();
    },

    generateQuestions(level) {
        const questions = [];

        for (let i = 0; i < this.totalQuestions; i++) {
            let question;

            switch (level) {
                case 1: // Numbers 1-9
                    question = this.createNumberQuestion(1, 9);
                    break;
                case 2: // Numbers 1-99
                    question = this.createNumberQuestion(1, 99);
                    break;
                case 3: // Addition (1-digit)
                    question = this.createMathQuestion('addition', 1, 9);
                    break;
                case 4: // Addition & Subtraction
                    if (Math.random() > 0.5) {
                        question = this.createMathQuestion('addition', 1, 50);
                    } else {
                        question = this.createMathQuestion('subtraction', 1, 50);
                    }
                    break;
                case 5: // Mixed operations, larger numbers
                    if (Math.random() > 0.5) {
                        question = this.createMathQuestion('addition', 10, 999);
                    } else {
                        question = this.createMathQuestion('subtraction', 10, 999);
                    }
                    break;
                default:
                    question = this.createNumberQuestion(1, 9);
            }
            questions.push(question);
        }

        return questions;
    },

    createNumberQuestion(min, max) {
        const num = App.randomInt(min, max);
        const wrongAnswers = this.generateWrongAnswers(num, min, max, 3);
        const options = App.shuffleArray([num, ...wrongAnswers]);

        return {
            type: 'number',
            text: 'What number is this on the abacus?',
            problem: num.toString(),
            correctAnswer: num,
            options: options,
            inputType: max > 20 ? 'input' : 'options'
        };
    },

    createMathQuestion(operation, min, max) {
        let a, b, answer, symbol;

        if (operation === 'addition') {
            a = App.randomInt(min, max);
            b = App.randomInt(min, max);
            answer = a + b;
            symbol = '+';
        } else {
            a = App.randomInt(min, max);
            b = App.randomInt(min, Math.min(a, max));
            if (b > a) [a, b] = [b, a];
            answer = a - b;
            symbol = '−';
        }

        const wrongAnswers = this.generateWrongAnswers(answer, 0, answer + max, 3);
        const options = App.shuffleArray([answer, ...wrongAnswers]);

        return {
            type: 'math',
            text: 'Solve this problem:',
            problem: `${a} ${symbol} ${b}`,
            correctAnswer: answer,
            options: options,
            inputType: max > 20 ? 'input' : 'options'
        };
    },

    generateWrongAnswers(correct, min, max, count) {
        const wrong = new Set();
        let attempts = 0;

        while (wrong.size < count && attempts < 100) {
            // Generate nearby wrong answers for better difficulty
            const offset = App.randomInt(1, Math.max(3, Math.floor(correct * 0.3) || 3));
            const candidate = Math.random() > 0.5 ? correct + offset : Math.max(0, correct - offset);

            if (candidate !== correct && candidate >= 0) {
                wrong.add(candidate);
            }
            attempts++;
        }

        // Fill remaining with random values if needed
        while (wrong.size < count) {
            const val = App.randomInt(Math.max(0, min), max);
            if (val !== correct) wrong.add(val);
        }

        return Array.from(wrong).slice(0, count);
    },

    showQuestion() {
        const q = this.questions[this.currentQuestion];
        if (!q) return;

        // Update header
        document.getElementById('exam-question-num').textContent =
            `Q ${this.currentQuestion + 1}/${this.totalQuestions}`;

        // Update progress bar
        const progress = ((this.currentQuestion) / this.totalQuestions) * 100;
        document.getElementById('exam-progress-fill').style.width = `${progress}%`;

        // Render question
        const area = document.getElementById('exam-question-area');

        if (q.inputType === 'options') {
            area.innerHTML = `
                <div class="exam-question-text">${q.text}</div>
                <div class="exam-question-problem">${q.problem}</div>
                <div class="exam-options">
                    ${q.options.map(opt => `
                        <button class="exam-option" data-value="${opt}" onclick="Exam.submitAnswer(${opt})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            `;
        } else {
            area.innerHTML = `
                <div class="exam-question-text">${q.text}</div>
                <div class="exam-question-problem">${q.problem}</div>
                <div class="exam-input-area">
                    <input type="number" class="exam-answer-input" id="exam-answer-input" 
                           placeholder="?" autocomplete="off" autofocus>
                    <button class="btn btn-primary" onclick="Exam.submitInputAnswer()">
                        Submit ✓
                    </button>
                </div>
            `;

            // Focus input and handle Enter key
            const input = document.getElementById('exam-answer-input');
            if (input) {
                setTimeout(() => input.focus(), 100);
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.submitInputAnswer();
                });
            }
        }
    },

    submitAnswer(value) {
        const q = this.questions[this.currentQuestion];
        const isCorrect = value === q.correctAnswer;

        // Highlight correct/incorrect
        document.querySelectorAll('.exam-option').forEach(opt => {
            const v = parseInt(opt.dataset.value);
            opt.classList.add('disabled');
            if (v === q.correctAnswer) {
                opt.classList.add('correct');
            } else if (v === value && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        this.processAnswer(isCorrect);
    },

    submitInputAnswer() {
        const input = document.getElementById('exam-answer-input');
        if (!input || input.value === '') return;

        const value = parseInt(input.value);
        const q = this.questions[this.currentQuestion];
        const isCorrect = value === q.correctAnswer;

        if (isCorrect) {
            input.style.borderColor = '#51CF66';
            input.style.background = 'rgba(81, 207, 102, 0.1)';
        } else {
            input.style.borderColor = '#FF6B6B';
            input.style.background = 'rgba(255, 107, 107, 0.1)';

            // Show correct answer
            const area = document.getElementById('exam-question-area');
            const msg = document.createElement('p');
            msg.style.cssText = 'margin-top: 12px; font-weight: 700; color: #51CF66; font-size: 18px;';
            msg.textContent = `Correct answer: ${q.correctAnswer}`;
            area.appendChild(msg);
        }

        input.disabled = true;
        this.processAnswer(isCorrect);
    },

    processAnswer(isCorrect) {
        if (isCorrect) {
            this.score++;
            document.getElementById('exam-score').textContent = this.score;
        }

        this.answeredQuestions.push({
            question: this.questions[this.currentQuestion],
            correct: isCorrect
        });

        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.totalQuestions) {
                this.showQuestion();
            } else {
                this.finishExam();
            }
        }, isCorrect ? 600 : 1200);
    },

    /* ===== TIMER ===== */
    startTimer() {
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimerDisplay();
        }, 1000);
    },

    updateTimerDisplay() {
        const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
        const display = document.getElementById('timer-value');
        if (display) {
            display.textContent = `${mins}:${secs}`;
        }
    },

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    /* ===== END EXAM ===== */
    finishExam() {
        this.stopTimer();
        this.isExamActive = false;

        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0;

        // Save result
        App.addExamResult({
            level: this.currentLevel,
            score: this.score,
            total: this.totalQuestions,
            percentage: percentage,
            stars: stars,
            time: this.elapsedSeconds
        });

        // Show results
        this.showResults(percentage, stars);

        // Launch confetti for good scores
        if (percentage >= 70) {
            App.launchConfetti();
        }
    },

    endExam() {
        this.stopTimer();
        this.isExamActive = false;
        this.showSetup();
    },

    showResults(percentage, stars) {
        document.getElementById('exam-active').style.display = 'none';
        const results = document.getElementById('exam-results');
        results.style.display = 'block';

        let emoji, title, subtitle;

        if (percentage === 100) {
            emoji = '🏆';
            title = 'PERFECT SCORE!';
            subtitle = 'You are an absolute genius! Every single answer was correct!';
        } else if (percentage >= 90) {
            emoji = '🌟';
            title = 'Outstanding!';
            subtitle = 'Almost perfect! You really know your stuff!';
        } else if (percentage >= 70) {
            emoji = '😊';
            title = 'Great Job!';
            subtitle = 'You\'re doing really well! Keep practicing!';
        } else if (percentage >= 50) {
            emoji = '💪';
            title = 'Good Effort!';
            subtitle = 'You\'re getting there! A bit more practice and you\'ll ace it!';
        } else {
            emoji = '📚';
            title = 'Keep Learning!';
            subtitle = 'Don\'t worry! Go back to tutorials and try again. You\'ll get better!';
        }

        const starsDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
        const mins = Math.floor(this.elapsedSeconds / 60);
        const secs = this.elapsedSeconds % 60;
        const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

        results.innerHTML = `
            <div class="results-card">
                <div class="results-emoji">${emoji}</div>
                <h2 class="results-title">${title}</h2>
                <p class="results-subtitle">${subtitle}</p>
                <div class="results-score">${percentage}%</div>
                <div class="results-stars">${starsDisplay}</div>
                <div class="results-details">
                    <div class="result-detail">
                        <span class="rd-value" style="color: #51CF66;">✅ ${this.score}</span>
                        <span class="rd-label">Correct</span>
                    </div>
                    <div class="result-detail">
                        <span class="rd-value" style="color: #FF6B6B;">❌ ${this.totalQuestions - this.score}</span>
                        <span class="rd-label">Incorrect</span>
                    </div>
                    <div class="result-detail">
                        <span class="rd-value">⏱ ${timeStr}</span>
                        <span class="rd-label">Time Taken</span>
                    </div>
                    <div class="result-detail">
                        <span class="rd-value">⭐ ${stars}</span>
                        <span class="rd-label">Stars Earned</span>
                    </div>
                </div>

                <div style="margin: 24px 0;">
                    <h3 style="margin-bottom: 12px;">📋 Review Your Answers</h3>
                    <div style="text-align: left; max-width: 400px; margin: 0 auto;">
                        ${this.answeredQuestions.map((aq, i) => `
                            <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; 
                                        border-radius: 8px; margin-bottom: 4px;
                                        background: ${aq.correct ? 'rgba(81,207,102,0.1)' : 'rgba(255,107,107,0.1)'};">
                                <span style="font-size: 16px;">${aq.correct ? '✅' : '❌'}</span>
                                <span style="font-weight: 700; font-size: 14px; flex: 1;">
                                    Q${i + 1}: ${aq.question.problem}
                                </span>
                                <span style="font-weight: 700; color: ${aq.correct ? '#51CF66' : '#FF6B6B'}; font-size: 14px;">
                                    = ${aq.question.correctAnswer}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="results-actions">
                    <button class="btn btn-primary btn-lg" onclick="Exam.startExam(${this.currentLevel})">
                        🔄 Try Again
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="Exam.showSetup()">
                        📊 Choose Level
                    </button>
                    <button class="btn btn-ghost" onclick="App.navigate('progress')">
                        📈 View Progress
                    </button>
                </div>
            </div>
        `;
    }
};
