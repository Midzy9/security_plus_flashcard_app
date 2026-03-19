const SpacedRepetition = (() => {
    function todayStr() {
        return new Date().toISOString().split('T')[0];
    }

    function addDays(dateStr, days) {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0];
    }

    function newCardProgress(cardId) {
        return {
            card_id: cardId,
            ease_factor: 2.5,
            interval: 0,
            repetitions: 0,
            next_review: todayStr(),
            last_quality: null
        };
    }

    function updateCard(card, quality) {
        // quality: 0 (again), 2 (hard), 4 (good)
        if (quality < 2) {
            card.repetitions = 0;
            card.interval = 0;
        } else {
            card.repetitions += 1;
            if (card.repetitions === 1) {
                card.interval = 1;
            } else if (card.repetitions === 2) {
                card.interval = 3;
            } else {
                card.interval = Math.round(card.interval * card.ease_factor);
            }
        }

        card.ease_factor = card.ease_factor + (0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02));
        if (card.ease_factor < 1.3) card.ease_factor = 1.3;

        card.next_review = addDays(todayStr(), card.interval);
        card.last_quality = quality;

        return card;
    }

    function classifyCard(cardProgress) {
        if (!cardProgress) return 'new';
        if (cardProgress.repetitions >= 5 && cardProgress.interval >= 21) return 'mastered';
        if (cardProgress.next_review <= todayStr()) return 'due';
        return 'learning';
    }

    function isDue(cardProgress) {
        if (!cardProgress) return true; // new cards are due
        return cardProgress.next_review <= todayStr();
    }

    function buildSessionQueue(allCards, progressData, maxCards = 20) {
        const due = [];
        const newCards = [];
        const learning = []; // reviewed but not yet due

        for (const card of allCards) {
            const prog = progressData.cards[card.id];
            const classification = classifyCard(prog);

            if (classification === 'new') {
                newCards.push(card);
            } else if (classification === 'mastered') {
                // exclude mastered cards from sessions
            } else if (isDue(prog)) {
                due.push(card);
            } else {
                learning.push(card);
            }
        }

        shuffle(due);
        shuffle(newCards);
        shuffle(learning);

        const queue = [];

        // 1. Due cards always go in first (they need review)
        for (const card of due) {
            if (queue.length >= maxCards) break;
            queue.push(card);
        }

        // 2. Fill remaining slots with a random mix of new and learning cards
        const filler = [...newCards, ...learning];
        shuffle(filler);
        for (const card of filler) {
            if (queue.length >= maxCards) break;
            queue.push(card);
        }

        // 3. Shuffle the full queue so card types are interleaved
        shuffle(queue);

        return queue;
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function countByClassification(allCards, progressData) {
        const counts = { new: 0, learning: 0, due: 0, mastered: 0 };
        for (const card of allCards) {
            const prog = progressData.cards[card.id];
            const cls = classifyCard(prog);
            counts[cls]++;
            // Also count due within learning
            if (cls === 'learning' && prog && prog.next_review <= todayStr()) {
                counts.due++;
            }
        }
        return counts;
    }

    function countDue(allCards, progressData) {
        let count = 0;
        for (const card of allCards) {
            const prog = progressData.cards[card.id];
            if (isDue(prog)) count++;
        }
        return count;
    }

    return {
        todayStr,
        newCardProgress,
        updateCard,
        classifyCard,
        isDue,
        buildSessionQueue,
        countByClassification,
        countDue
    };
})();
