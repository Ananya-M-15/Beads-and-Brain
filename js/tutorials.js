/* ============================================
   BEADS & BRAIN — Tutorials Module
   Step-by-step abacus lessons for kids
   ============================================ */

const Tutorials = {
    initialized: false,
    currentLesson: null,

    lessons: [
        {
            id: 'intro',
            title: 'What is an Abacus?',
            emoji: '🧮',
            desc: 'Discover the amazing world of abacus!',
            content: `
                <div class="lesson-body">
                    <h2>🧮 What is an Abacus?</h2>
                    <p>An <strong>abacus</strong> is one of the oldest calculating tools in the world! People have used it for <em>thousands of years</em> to do math quickly and accurately.</p>
                    
                    <div class="highlight-box">
                        <strong>📚 Did you know?</strong><br>
                        The word "abacus" comes from the Greek word "abax" which means "calculating table." The abacus was invented over 5,000 years ago!
                    </div>

                    <h3>Why Learn the Abacus?</h3>
                    <ul>
                        <li>🧠 <strong>Boosts brain power</strong> — uses both sides of your brain!</li>
                        <li>⚡ <strong>Super-fast calculations</strong> — become a math speedster!</li>
                        <li>🎯 <strong>Improves concentration</strong> — helps you focus better</li>
                        <li>💪 <strong>Builds confidence</strong> — math becomes your friend!</li>
                        <li>🏆 <strong>Compete in competitions</strong> — show off your skills!</li>
                    </ul>

                    <div class="fun-fact">
                        🌟 Fun Fact: Expert abacus users can solve math problems even faster than a calculator! Some can even do math without a physical abacus — just by imagining one in their mind!
                    </div>

                    <h3>Types of Abacus</h3>
                    <p>There are different types of abacus used around the world:</p>
                    <ul>
                        <li><strong>Soroban</strong> 🇯🇵 — Japanese abacus (1 upper bead, 4 lower beads)</li>
                        <li><strong>Suanpan</strong> 🇨🇳 — Chinese abacus (2 upper beads, 5 lower beads)</li>
                        <li><strong>Schoty</strong> 🇷🇺 — Russian abacus (10 beads per rod)</li>
                    </ul>
                    <p>In this course, we'll learn the <strong>Soroban</strong> style, which is the most popular for abacus education!</p>
                </div>
            `
        },
        {
            id: 'parts',
            title: 'Parts of the Abacus',
            emoji: '🔧',
            desc: 'Learn about each part and what it does',
            content: `
                <div class="lesson-body">
                    <h2>🔧 Parts of the Abacus</h2>
                    <p>Let's get to know our abacus! Every part has an important job.</p>
                    
                    <h3>The Main Parts</h3>
                    <ul>
                        <li>📏 <strong>Frame</strong> — The wooden border that holds everything together</li>
                        <li>🔗 <strong>Rods (Columns)</strong> — Vertical bars where beads slide up and down</li>
                        <li>➖ <strong>Beam (Bar)</strong> — The horizontal bar that divides the abacus into two parts</li>
                        <li>🔴 <strong>Heaven Beads (Upper)</strong> — The single bead above the beam, worth <strong>5</strong></li>
                        <li>🟢 <strong>Earth Beads (Lower)</strong> — The four beads below the beam, each worth <strong>1</strong></li>
                    </ul>

                    <div class="highlight-box tip">
                        💡 <strong>Remember:</strong> Each rod represents a <em>place value</em> — ones, tens, hundreds, etc. Just like in regular numbers!
                    </div>

                    <h3>How Beads Work</h3>
                    <p>Beads are <strong>"active"</strong> (counted) when they touch the beam:</p>
                    <ul>
                        <li>🔴 <strong>Heaven bead</strong> — Push it <strong>DOWN</strong> to the beam = counts as <strong>5</strong></li>
                        <li>🟢 <strong>Earth bead</strong> — Push it <strong>UP</strong> to the beam = counts as <strong>1</strong></li>
                    </ul>
                    <p>When beads are <strong>away</strong> from the beam, they are not counted (value = 0).</p>

                    <div class="fun-fact">
                        🎯 Try it yourself! Go to the Abacus Playground and click on the beads to see them move!
                    </div>

                    <h3>Place Values</h3>
                    <p>Reading right to left, each rod represents:</p>
                    <ul>
                        <li><strong>1st rod</strong> — Ones (1s)</li>
                        <li><strong>2nd rod</strong> — Tens (10s)</li>
                        <li><strong>3rd rod</strong> — Hundreds (100s)</li>
                        <li><strong>4th rod</strong> — Thousands (1000s)</li>
                        <li>And so on...</li>
                    </ul>
                </div>
            `
        },
        {
            id: 'numbers-1-4',
            title: 'Numbers 1 to 4',
            emoji: '1️⃣',
            desc: 'Learn to show numbers 1, 2, 3, and 4',
            content: `
                <div class="lesson-body">
                    <h2>1️⃣ Showing Numbers 1 to 4</h2>
                    <p>Let's start simple! To show numbers 1 through 4, we only use the <strong>earth beads</strong> (bottom beads).</p>

                    <h3>How to do it:</h3>
                    <ul>
                        <li><strong>Number 1</strong> — Push 1 earth bead UP to the beam</li>
                        <li><strong>Number 2</strong> — Push 2 earth beads UP to the beam</li>
                        <li><strong>Number 3</strong> — Push 3 earth beads UP to the beam</li>
                        <li><strong>Number 4</strong> — Push 4 earth beads UP to the beam</li>
                    </ul>

                    <div class="highlight-box tip">
                        💡 <strong>Tip:</strong> Always use the rightmost rod (ones place) for single-digit numbers!
                    </div>

                    <h3>Practice Time! 🎮</h3>
                    <p>Now go to the <strong>Abacus Playground</strong> and try making these numbers:</p>
                    <ol>
                        <li>Show the number <strong>1</strong></li>
                        <li>Show the number <strong>3</strong></li>
                        <li>Show the number <strong>4</strong></li>
                    </ol>

                    <div class="fun-fact">
                        🌟 Great job! You just learned how to show the first four numbers on an abacus! That's how all math masters start!
                    </div>
                </div>
            `
        },
        {
            id: 'number-5',
            title: 'The Number 5',
            emoji: '5️⃣',
            desc: 'Learn the special heaven bead!',
            content: `
                <div class="lesson-body">
                    <h2>5️⃣ The Special Number 5</h2>
                    <p>Number 5 is special on the abacus! Instead of pushing up 5 earth beads (we only have 4!), we use the <strong>heaven bead</strong>.</p>

                    <h3>How to show 5:</h3>
                    <ul>
                        <li>Push the <strong>heaven bead</strong> (top bead) <strong>DOWN</strong> to the beam</li>
                        <li>Make sure all earth beads are <strong>DOWN</strong> (away from the beam)</li>
                    </ul>

                    <div class="highlight-box">
                        <strong>Remember:</strong> Heaven bead = 5, Earth bead = 1. The heaven bead is like a <em>super bead</em>! ✨
                    </div>

                    <h3>Numbers 6, 7, 8, and 9</h3>
                    <p>For numbers 6-9, we use the heaven bead <strong>PLUS</strong> some earth beads:</p>
                    <ul>
                        <li><strong>6</strong> = Heaven bead (5) + 1 earth bead (1) = 5 + 1</li>
                        <li><strong>7</strong> = Heaven bead (5) + 2 earth beads (2) = 5 + 2</li>
                        <li><strong>8</strong> = Heaven bead (5) + 3 earth beads (3) = 5 + 3</li>
                        <li><strong>9</strong> = Heaven bead (5) + 4 earth beads (4) = 5 + 4</li>
                    </ul>

                    <div class="fun-fact">
                        🎯 Challenge: Go to the Abacus Playground and try the "Challenge Me!" button to practice making different numbers!
                    </div>
                </div>
            `
        },
        {
            id: 'two-digit',
            title: 'Two-Digit Numbers',
            emoji: '🔢',
            desc: 'Make bigger numbers like 42 and 87!',
            content: `
                <div class="lesson-body">
                    <h2>🔢 Two-Digit Numbers</h2>
                    <p>Now we'll use <strong>two rods</strong> to make bigger numbers! Remember: the right rod is <em>ones</em> and the next rod to the left is <em>tens</em>.</p>

                    <h3>Example: Making 23</h3>
                    <ul>
                        <li><strong>Tens rod:</strong> Push 2 earth beads up = 20</li>
                        <li><strong>Ones rod:</strong> Push 3 earth beads up = 3</li>
                        <li><strong>Total:</strong> 20 + 3 = <strong>23</strong> ✅</li>
                    </ul>

                    <h3>Example: Making 67</h3>
                    <ul>
                        <li><strong>Tens rod:</strong> Heaven bead down + 1 earth bead up = 60</li>
                        <li><strong>Ones rod:</strong> Heaven bead down + 2 earth beads up = 7</li>
                        <li><strong>Total:</strong> 60 + 7 = <strong>67</strong> ✅</li>
                    </ul>

                    <div class="highlight-box tip">
                        💡 <strong>Think of it this way:</strong> Each rod works exactly like the ones rod — just that its value is multiplied by its place value (10, 100, 1000, etc.)
                    </div>

                    <h3>Practice These Numbers:</h3>
                    <ol>
                        <li>Make <strong>15</strong> on the abacus</li>
                        <li>Make <strong>42</strong> on the abacus</li>
                        <li>Make <strong>99</strong> on the abacus (the biggest 2-digit number!)</li>
                    </ol>

                    <div class="fun-fact">
                        🏆 You can now represent numbers from 0 to 99! That's already 100 different numbers!
                    </div>
                </div>
            `
        },
        {
            id: 'three-digit',
            title: 'Three-Digit Numbers',
            emoji: '💯',
            desc: 'Master hundreds and beyond!',
            content: `
                <div class="lesson-body">
                    <h2>💯 Three-Digit Numbers</h2>
                    <p>You're getting great at this! Now let's use <strong>three rods</strong> for numbers up to 999!</p>

                    <h3>Example: Making 456</h3>
                    <ul>
                        <li><strong>Hundreds rod:</strong> 4 earth beads up = 400</li>
                        <li><strong>Tens rod:</strong> Heaven bead down + 0 earth beads = 50</li>
                        <li><strong>Ones rod:</strong> Heaven bead down + 1 earth bead = 6</li>
                        <li><strong>Total:</strong> 400 + 50 + 6 = <strong>456</strong> ✅</li>
                    </ul>

                    <h3>Example: Making 302</h3>
                    <ul>
                        <li><strong>Hundreds rod:</strong> 3 earth beads up = 300</li>
                        <li><strong>Tens rod:</strong> No beads (empty) = 0</li>
                        <li><strong>Ones rod:</strong> 2 earth beads up = 2</li>
                        <li><strong>Total:</strong> 300 + 0 + 2 = <strong>302</strong> ✅</li>
                    </ul>

                    <div class="highlight-box">
                        <strong>💡 Important:</strong> When a digit is 0, that rod stays empty (no beads touching the beam). This is how we represent zero in any place!
                    </div>

                    <h3>Challenge Yourself:</h3>
                    <ol>
                        <li>Make <strong>100</strong> on the abacus</li>
                        <li>Make <strong>555</strong> on the abacus</li>
                        <li>Make <strong>809</strong> on the abacus</li>
                    </ol>
                </div>
            `
        },
        {
            id: 'addition-basic',
            title: 'Simple Addition',
            emoji: '➕',
            desc: 'Add numbers on the abacus!',
            content: `
                <div class="lesson-body">
                    <h2>➕ Simple Addition on the Abacus</h2>
                    <p>Adding on the abacus is like counting more beads! Let's start with simple examples.</p>

                    <h3>Rule: To add, push MORE beads toward the beam</h3>
                    
                    <h3>Example: 3 + 2</h3>
                    <ol>
                        <li><strong>Start:</strong> Set the abacus to 3 (push 3 earth beads up)</li>
                        <li><strong>Add 2:</strong> Push 2 more earth beads up</li>
                        <li><strong>Result:</strong> 5 earth beads? Wait! We only have 4 earth beads!</li>
                    </ol>
                    
                    <div class="highlight-box tip">
                        💡 <strong>The 5-Exchange Rule:</strong> When you need to push up a 5th earth bead, instead:<br>
                        1. Push DOWN the heaven bead (adds 5)<br>
                        2. Push DOWN all earth beads on that rod (removes 4)<br>
                        Net effect: +5 -4 = +1 more ✅
                    </div>

                    <h3>Let's redo: 3 + 2</h3>
                    <ol>
                        <li>Set abacus to 3 (3 earth beads up)</li>
                        <li>Add 1: push 1 more earth bead up → Now shows 4</li>
                        <li>Add 1 more: Can't push a 5th bead! Use the exchange:</li>
                        <li>Push heaven bead DOWN and push all earth beads DOWN</li>
                        <li>Result: Shows 5 ✅</li>
                    </ol>

                    <h3>Example: 4 + 3</h3>
                    <ol>
                        <li>Set abacus to 4 (4 earth beads up)</li>
                        <li>Add 3: Can't push 3 more earth beads (only have 0 left)</li>
                        <li>Use exchange: Push heaven DOWN, push all earth beads DOWN → Shows 5</li>
                        <li>Now add remaining 2: Push 2 earth beads up → Shows 7 ✅</li>
                    </ol>

                    <div class="fun-fact">
                        🌟 The exchange rules might seem tricky at first, but with practice, they become as natural as breathing! Your fingers will learn the patterns automatically.
                    </div>
                </div>
            `
        },
        {
            id: 'addition-carry',
            title: 'Addition with Carry',
            emoji: '🔄',
            desc: 'Learn carrying on the abacus',
            content: `
                <div class="lesson-body">
                    <h2>🔄 Addition with Carrying</h2>
                    <p>When adding makes a rod go past 9, we need to <strong>carry</strong> to the next rod — just like on paper!</p>

                    <h3>The 10-Carry Rule</h3>
                    <div class="highlight-box">
                        When a rod would total more than 9:<br>
                        1. <strong>Remove 10</strong> from the current rod (reset it)<br>
                        2. <strong>Add 1</strong> to the rod on the LEFT (the next place value)
                    </div>

                    <h3>Example: 8 + 5</h3>
                    <ol>
                        <li>Set abacus to 8 (heaven + 3 earth beads on ones rod)</li>
                        <li>Need to add 5: Ones rod can only show up to 9</li>
                        <li>Think: 8 + 5 = 13, so we need to carry!</li>
                        <li>On the ones rod: set to 3 (the remainder after carrying)</li>
                        <li>On the tens rod: add 1</li>
                        <li>Result: Tens = 1, Ones = 3 → <strong>13</strong> ✅</li>
                    </ol>

                    <h3>Example: 27 + 15</h3>
                    <ol>
                        <li>Set abacus to 27</li>
                        <li>Add 5 to ones rod: 7 + 5 = 12 → Write 2, carry 1</li>
                        <li>Ones rod: Set to 2</li>
                        <li>Add carry (1) + add value (1) to tens rod: 2 + 1 + 1 = 4</li>
                        <li>Tens rod: Set to 4</li>
                        <li>Result: <strong>42</strong> ✅</li>
                    </ol>

                    <div class="fun-fact">
                        ⚡ Speed tip: With practice, you won't even think about the rules — your fingers will automatically know where to move the beads!
                    </div>
                </div>
            `
        },
        {
            id: 'subtraction',
            title: 'Subtraction Basics',
            emoji: '➖',
            desc: 'Subtract numbers on the abacus',
            content: `
                <div class="lesson-body">
                    <h2>➖ Subtraction on the Abacus</h2>
                    <p>Subtraction is the opposite of addition — we <strong>move beads away</strong> from the beam!</p>

                    <h3>Rule: To subtract, move beads AWAY from the beam</h3>

                    <h3>Example: 7 - 3</h3>
                    <ol>
                        <li>Set abacus to 7 (heaven + 2 earth beads)</li>
                        <li>Subtract 3: Push 2 earth beads DOWN (away from beam)</li>
                        <li>Still need to subtract 1 more, but no earth beads left!</li>
                        <li>Use the reverse exchange: Push heaven bead UP (remove 5), push 4 earth beads UP (add 4)</li>
                        <li>Net effect: removed 5, added 4 = removed 1</li>
                        <li>Result: 4 earth beads up = <strong>4</strong> ✅</li>
                    </ol>

                    <div class="highlight-box tip">
                        💡 <strong>The Reverse 5-Exchange:</strong> When you can't remove enough earth beads:<br>
                        1. Push UP the heaven bead (removes 5)<br>
                        2. Push UP earth beads to make up the difference
                    </div>

                    <h3>Example: 13 - 7</h3>
                    <ol>
                        <li>Set abacus to 13 (tens: 1, ones: 3)</li>
                        <li>Subtract 7 from ones rod: 3 - 7 = not enough!</li>
                        <li>Borrow from tens: Remove 1 from tens rod, add 10 to ones</li>
                        <li>Now ones = 13, subtract 7 = 6</li>
                        <li>Result: Tens = 0, Ones = 6 → <strong>6</strong> ✅</li>
                    </ol>

                    <div class="fun-fact">
                        🧠 The borrowing concept on an abacus is the same as borrowing in regular math. The abacus just makes it more visual and hands-on!
                    </div>
                </div>
            `
        },
        {
            id: 'mental-math',
            title: 'Mental Abacus',
            emoji: '🧠',
            desc: 'Calculate WITHOUT a physical abacus!',
            content: `
                <div class="lesson-body">
                    <h2>🧠 Mental Abacus — The Superpower!</h2>
                    <p>This is the ultimate goal of abacus training — doing math in your head by <strong>imagining</strong> the abacus!</p>

                    <h3>How Mental Abacus Works</h3>
                    <p>After enough practice with a physical abacus, your brain creates a <strong>mental image</strong> of the abacus. You can then:</p>
                    <ul>
                        <li>🖼️ <strong>Visualize</strong> the abacus in your mind</li>
                        <li>👆 <strong>Imagine</strong> moving the beads</li>
                        <li>🔢 <strong>Read</strong> the answer from your mental image</li>
                    </ul>

                    <div class="highlight-box">
                        <strong>❓ Practice Exercise:</strong><br>
                        Close your eyes. Imagine an abacus. Now try these:<br><br>
                        1. Set 3 on the ones rod (imagine pushing 3 earth beads up)<br>
                        2. Add 4 (imagine pushing the heaven bead down and clearing earth beads)<br>
                        3. What do you see? It should be 7!
                    </div>

                    <h3>Tips for Building Mental Abacus Skills</h3>
                    <ol>
                        <li>🏋️ Practice physical abacus every day (at least 15 minutes)</li>
                        <li>👀 Before clicking a bead, <strong>predict</strong> the result</li>
                        <li>🔇 Try solving problems without looking at the abacus</li>
                        <li>⏱️ Gradually increase your speed</li>
                        <li>📝 Use our practice sheets and exams regularly</li>
                    </ol>

                    <div class="fun-fact">
                        🏆 World Record: Some mental abacus champions can add 15 three-digit numbers in under 5 seconds! That's faster than most people can type the numbers into a calculator!
                    </div>

                    <h3>Your Journey Continues!</h3>
                    <p>Now that you know the basics, it's time to practice! Use our:</p>
                    <ul>
                        <li>🧮 <strong>Abacus Playground</strong> — to practice manipulating beads</li>
                        <li>📝 <strong>Practice Sheets</strong> — to drill offline</li>
                        <li>🎯 <strong>Exam Zone</strong> — to test and track your progress</li>
                    </ul>
                </div>
            `
        }
    ],

    init() {
        if (this.initialized) return;
        this.renderSidebar();
        this.initialized = true;
    },

    renderSidebar() {
        const sidebar = document.getElementById('lessons-sidebar');
        if (!sidebar) return;

        const completedLessons = App.progressData?.completedLessons || [];

        sidebar.innerHTML = `
            <h3 style="margin-bottom: 16px; font-size: 18px;">📖 Lessons</h3>
            ${this.lessons.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = this.currentLesson === lesson.id;
            return `
                    <div class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                         data-lesson="${lesson.id}" onclick="Tutorials.openLesson('${lesson.id}')">
                        <div class="lesson-num">${isCompleted ? '✓' : idx + 1}</div>
                        <div class="lesson-info">
                            <h4>${lesson.emoji} ${lesson.title}</h4>
                            <p>${lesson.desc}</p>
                        </div>
                    </div>
                `;
        }).join('')}
        `;
    },

    openLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        this.currentLesson = lessonId;

        // Re-render sidebar to update active state
        this.renderSidebar();

        // Render lesson content
        const contentArea = document.getElementById('lesson-content');
        if (!contentArea) return;

        const idx = this.lessons.findIndex(l => l.id === lessonId);
        const prevLesson = idx > 0 ? this.lessons[idx - 1] : null;
        const nextLesson = idx < this.lessons.length - 1 ? this.lessons[idx + 1] : null;

        contentArea.innerHTML = `
            ${lesson.content}
            <div class="lesson-nav">
                ${prevLesson ?
                `<button class="btn btn-ghost" onclick="Tutorials.openLesson('${prevLesson.id}')">
                        ← ${prevLesson.title}
                    </button>` :
                `<div></div>`
            }
                <button class="btn btn-success" onclick="Tutorials.completeLesson('${lesson.id}')">
                    ✓ Mark Complete
                </button>
                ${nextLesson ?
                `<button class="btn btn-primary" onclick="Tutorials.openLesson('${nextLesson.id}')">
                        ${nextLesson.title} →
                    </button>` :
                `<button class="btn btn-primary" onclick="App.navigate('practice')">
                        Start Practicing →
                    </button>`
            }
            </div>
        `;

        // Scroll to top of content on mobile
        if (window.innerWidth <= 860) {
            contentArea.scrollIntoView({ behavior: 'smooth' });
        }
    },

    completeLesson(lessonId) {
        App.completeLesson(lessonId);
        this.renderSidebar();

        // Find next lesson
        const idx = this.lessons.findIndex(l => l.id === lessonId);
        if (idx < this.lessons.length - 1) {
            this.openLesson(this.lessons[idx + 1].id);
        }
    }
};
