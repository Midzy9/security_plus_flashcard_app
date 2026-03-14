const App = (() => {
    let progressData = null;
    let sessionQueue = [];
    let sessionIndex = 0;
    let sessionResults = { good: 0, hard: 0, again: 0 };

    async function init() {
        await Flashcards.loadData();
        progressData = await Progress.loadOrInit();

        bindNavigation();
        bindDashboard();
        bindSelector();
        bindSession();
        bindSettings();

        showView('dashboard');
        updateDashboard();
    }

    // --- Navigation ---
    function bindNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                showView(view);
            });
        });
    }

    function showView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        const viewEl = document.getElementById('view-' + viewName);
        if (viewEl) viewEl.classList.add('active');

        const navBtn = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
        if (navBtn) navBtn.classList.add('active');

        if (viewName === 'dashboard') updateDashboard();
        if (viewName === 'selector') updateSelector();
        if (viewName === 'settings') updateSettings();
    }

    // --- Dashboard ---
    function bindDashboard() {
        document.getElementById('btn-study-all').addEventListener('click', () => {
            startSession(Flashcards.getAllCards());
        });

        document.getElementById('btn-review-due').addEventListener('click', () => {
            const allCards = Flashcards.getAllCards();
            const dueCards = allCards.filter(c => SpacedRepetition.isDue(progressData.cards[c.id]));
            if (dueCards.length === 0) {
                alert('No cards are due for review right now!');
                return;
            }
            startSession(dueCards);
        });
    }

    function updateDashboard() {
        const allCards = Flashcards.getAllCards();
        const counts = SpacedRepetition.countByClassification(allCards, progressData);
        const total = allCards.length;
        const mastered = counts.mastered;
        const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

        const overallBar = document.getElementById('overall-bar');
        overallBar.style.width = pct + '%';
        overallBar.querySelector('.progress-text').textContent = pct + '%';
        document.getElementById('overall-stats').textContent = `${mastered} / ${total} cards mastered`;

        // Due count
        const dueCount = SpacedRepetition.countDue(allCards, progressData);
        document.getElementById('due-count').textContent = dueCount;

        // Domain progress
        const domainList = document.getElementById('domain-progress');
        domainList.innerHTML = '';
        const domains = Flashcards.getDomains();

        for (const domain of domains) {
            const domainCards = Flashcards.getCardsByDomain(domain.id);
            const domainMastered = domainCards.filter(c =>
                SpacedRepetition.classifyCard(progressData.cards[c.id]) === 'mastered'
            ).length;
            const domainPct = domainCards.length > 0 ? Math.round((domainMastered / domainCards.length) * 100) : 0;

            const item = document.createElement('div');
            item.className = 'domain-item';
            item.innerHTML = `
                <div class="domain-item-header">
                    <span class="domain-item-name">${domain.id} ${domain.name}</span>
                    <span class="domain-item-count">${domainMastered}/${domainCards.length}</span>
                </div>
                <div class="domain-bar-container">
                    <div class="domain-bar" style="width: ${domainPct}%"></div>
                </div>
            `;
            domainList.appendChild(item);
        }
    }

    // --- Selector ---
    function bindSelector() {
        document.getElementById('btn-start-session').addEventListener('click', () => {
            const checked = document.querySelectorAll('#objective-checklist input[data-objective]:checked');
            const objectiveIds = Array.from(checked).map(cb => cb.dataset.objective);

            if (objectiveIds.length === 0) {
                alert('Select at least one objective to study.');
                return;
            }

            const cards = Flashcards.getCardsByObjectives(objectiveIds);
            startSession(cards);
        });
    }

    function updateSelector() {
        const checklist = document.getElementById('objective-checklist');
        checklist.innerHTML = '';
        const domains = Flashcards.getDomains();

        for (const domain of domains) {
            const group = document.createElement('div');
            group.className = 'domain-group';

            const domainLabel = document.createElement('label');
            domainLabel.className = 'domain-checkbox';
            domainLabel.innerHTML = `
                <input type="checkbox" data-domain="${domain.id}" checked>
                ${domain.id} ${domain.name}
            `;
            group.appendChild(domainLabel);

            const domainCb = domainLabel.querySelector('input');
            domainCb.addEventListener('change', () => {
                const objCbs = group.querySelectorAll('input[data-objective]');
                objCbs.forEach(cb => cb.checked = domainCb.checked);
                updateSelectorCounts();
            });

            for (const obj of domain.objectives) {
                const objLabel = document.createElement('label');
                objLabel.className = 'objective-checkbox';
                objLabel.innerHTML = `
                    <input type="checkbox" data-objective="${obj.id}" checked>
                    ${obj.id} ${obj.title} (${obj.cardCount})
                `;
                objLabel.querySelector('input').addEventListener('change', updateSelectorCounts);
                group.appendChild(objLabel);
            }

            checklist.appendChild(group);
        }

        updateSelectorCounts();
    }

    function updateSelectorCounts() {
        const checked = document.querySelectorAll('#objective-checklist input[data-objective]:checked');
        const objectiveIds = Array.from(checked).map(cb => cb.dataset.objective);
        const cards = Flashcards.getCardsByObjectives(objectiveIds);

        let dueCount = 0;
        let newCount = 0;
        for (const card of cards) {
            const cls = SpacedRepetition.classifyCard(progressData.cards[card.id]);
            if (cls === 'new') newCount++;
            else if (cls === 'due' || SpacedRepetition.isDue(progressData.cards[card.id])) dueCount++;
        }

        document.getElementById('selected-count').textContent = cards.length;
        document.getElementById('selected-due').textContent = dueCount;
        document.getElementById('selected-new').textContent = newCount;
    }

    // --- Session ---
    function bindSession() {
        document.getElementById('card-container').addEventListener('click', flipCard);

        document.querySelectorAll('.rating-buttons .btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const quality = parseInt(btn.dataset.quality);
                rateCard(quality);
            });
        });

        document.getElementById('btn-end-session').addEventListener('click', endSession);
        document.getElementById('btn-back-dashboard').addEventListener('click', () => showView('dashboard'));
    }

    function startSession(cards) {
        sessionQueue = SpacedRepetition.buildSessionQueue(cards, progressData);
        if (sessionQueue.length === 0) {
            alert('No cards available for study in the selected objectives.');
            return;
        }
        sessionIndex = 0;
        sessionResults = { good: 0, hard: 0, again: 0 };

        // Show session view
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('view-session').classList.add('active');

        showCard();
    }

    function showCard() {
        if (sessionIndex >= sessionQueue.length) {
            endSession();
            return;
        }

        const card = sessionQueue[sessionIndex];
        document.getElementById('card-question').textContent = card.question;
        document.getElementById('card-answer').textContent = card.answer;
        document.getElementById('session-objective').textContent =
            `${card.objective_id} - ${card.objective_title}`;
        document.getElementById('session-counter').textContent =
            `Card ${sessionIndex + 1} of ${sessionQueue.length}`;

        // Reset card state
        document.getElementById('flashcard').classList.remove('flipped');
        document.getElementById('rating-buttons').classList.add('hidden');
        document.getElementById('tap-hint').textContent = 'Tap card to reveal answer';
    }

    function flipCard() {
        const card = document.getElementById('flashcard');
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            document.getElementById('rating-buttons').classList.remove('hidden');
            document.getElementById('tap-hint').textContent = 'How well did you know it?';
        }
    }

    function rateCard(quality) {
        const card = sessionQueue[sessionIndex];

        // Get or create progress for this card
        let cardProg = progressData.cards[card.id];
        if (!cardProg) {
            cardProg = SpacedRepetition.newCardProgress(card.id);
        }

        // Update with SM-2
        SpacedRepetition.updateCard(cardProg, quality);
        Progress.setCardProgress(progressData, card.id, cardProg);
        Progress.recordReview(progressData);

        // Track results
        if (quality === 0) sessionResults.again++;
        else if (quality === 2) sessionResults.hard++;
        else sessionResults.good++;

        // Next card
        sessionIndex++;
        showCard();
    }

    function endSession() {
        const results = document.getElementById('session-results');
        const total = sessionResults.good + sessionResults.hard + sessionResults.again;
        results.innerHTML = `
            <div class="result-row">
                <span class="result-label">Cards reviewed</span>
                <span class="result-value">${total}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Good</span>
                <span class="result-value result-good">${sessionResults.good}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Hard</span>
                <span class="result-value result-hard">${sessionResults.hard}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Again</span>
                <span class="result-value result-again">${sessionResults.again}</span>
            </div>
        `;

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-complete').classList.add('active');
    }

    // --- Settings ---
    function bindSettings() {
        document.getElementById('btn-export').addEventListener('click', () => {
            Progress.exportProgress();
        });

        document.getElementById('btn-import').addEventListener('click', () => {
            Progress.importProgress((data) => {
                progressData = data;
                updateSettings();
                alert('Progress imported successfully!');
            });
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            Progress.reset(async () => {
                progressData = await Progress.loadOrInit();
                updateSettings();
                alert('Progress has been reset.');
            });
        });
    }

    function updateSettings() {
        const allCards = Flashcards.getAllCards();
        const counts = SpacedRepetition.countByClassification(allCards, progressData);

        document.getElementById('stat-reviews').textContent = progressData.stats.total_reviews;
        document.getElementById('stat-mastered').textContent = counts.mastered;
        document.getElementById('stat-streak').textContent = progressData.stats.study_streak_days;
        document.getElementById('stat-last').textContent = progressData.stats.last_studied || 'Never';
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
