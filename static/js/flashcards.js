const Flashcards = (() => {
    let flashcardData = null;

    async function loadData() {
        const resp = await fetch('/api/flashcards');
        flashcardData = await resp.json();
        return flashcardData;
    }

    function getData() {
        return flashcardData;
    }

    function getAllCards() {
        if (!flashcardData) return [];
        const cards = [];
        for (const domain of flashcardData.domains) {
            for (const obj of domain.objectives) {
                for (const card of obj.cards) {
                    cards.push({
                        ...card,
                        domain_id: domain.id,
                        domain_name: domain.name,
                        objective_id: obj.id,
                        objective_title: obj.title
                    });
                }
            }
        }
        return cards;
    }

    function getCardsByObjectives(objectiveIds) {
        if (!flashcardData) return [];
        const cards = [];
        for (const domain of flashcardData.domains) {
            for (const obj of domain.objectives) {
                if (objectiveIds.includes(obj.id)) {
                    for (const card of obj.cards) {
                        cards.push({
                            ...card,
                            domain_id: domain.id,
                            domain_name: domain.name,
                            objective_id: obj.id,
                            objective_title: obj.title
                        });
                    }
                }
            }
        }
        return cards;
    }

    function getCardsByDomain(domainId) {
        if (!flashcardData) return [];
        const cards = [];
        for (const domain of flashcardData.domains) {
            if (domain.id === domainId) {
                for (const obj of domain.objectives) {
                    for (const card of obj.cards) {
                        cards.push({
                            ...card,
                            domain_id: domain.id,
                            domain_name: domain.name,
                            objective_id: obj.id,
                            objective_title: obj.title
                        });
                    }
                }
            }
        }
        return cards;
    }

    function getDomains() {
        if (!flashcardData) return [];
        return flashcardData.domains.map(d => ({
            id: d.id,
            name: d.name,
            weight: d.weight,
            objectives: d.objectives.map(o => ({
                id: o.id,
                title: o.title,
                cardCount: o.cards.length
            }))
        }));
    }

    return {
        loadData,
        getData,
        getAllCards,
        getCardsByObjectives,
        getCardsByDomain,
        getDomains
    };
})();
