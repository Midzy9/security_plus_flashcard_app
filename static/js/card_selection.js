const CardSelection = (() => {
    // A known card is this many times as likely to be drawn as an unknown one.
    const KNOWN_WEIGHT = 0.2;

    function todayStr() {
        return new Date().toISOString().split('T')[0];
    }

    function isKnown(cardProgress) {
        return !!(cardProgress && cardProgress.known);
    }

    function markCard(progressData, cardId, known) {
        progressData.cards[cardId] = { known, last_seen: todayStr() };
    }

    // Weighted random sample without replacement (Efraimidis-Spirakis):
    // each card gets key = random^(1/weight), and the highest keys win.
    function buildSessionQueue(allCards, progressData, maxCards = 20) {
        return allCards
            .map(card => {
                const weight = isKnown(progressData.cards[card.id]) ? KNOWN_WEIGHT : 1;
                return { card, key: Math.pow(Math.random(), 1 / weight) };
            })
            .sort((a, b) => b.key - a.key)
            .slice(0, maxCards)
            .map(entry => entry.card);
    }

    function countKnown(cards, progressData) {
        return cards.filter(c => isKnown(progressData.cards[c.id])).length;
    }

    return {
        todayStr,
        isKnown,
        markCard,
        buildSessionQueue,
        countKnown
    };
})();
