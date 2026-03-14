const Progress = (() => {
    const STORAGE_KEY = 'secplus_progress';

    function load() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                return JSON.parse(raw);
            } catch (e) {
                console.error('Failed to parse progress data:', e);
            }
        }
        return null;
    }

    function save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    async function loadOrInit() {
        let data = load();
        if (data) return data;

        // Fetch default progress from server
        try {
            const resp = await fetch('/api/default-progress');
            data = await resp.json();
        } catch (e) {
            data = {
                version: '1.0',
                exam: 'SY0-701',
                exported_at: null,
                stats: { total_reviews: 0, study_streak_days: 0, last_studied: null },
                cards: {}
            };
        }
        save(data);
        return data;
    }

    function getCardProgress(data, cardId) {
        return data.cards[cardId] || null;
    }

    function setCardProgress(data, cardId, cardData) {
        data.cards[cardId] = cardData;
        save(data);
    }

    function recordReview(data) {
        const today = SpacedRepetition.todayStr();
        data.stats.total_reviews++;

        if (data.stats.last_studied === today) {
            // Already studied today, no streak change
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (data.stats.last_studied === yesterdayStr) {
                data.stats.study_streak_days++;
            } else if (data.stats.last_studied !== today) {
                data.stats.study_streak_days = 1;
            }
            data.stats.last_studied = today;
        }

        save(data);
    }

    function exportProgress() {
        const data = load();
        if (!data) return;

        data.exported_at = new Date().toISOString();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'secplus_progress.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importProgress(callback) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (data.version && data.cards) {
                        save(data);
                        if (callback) callback(data);
                    } else {
                        alert('Invalid progress file format.');
                    }
                } catch (err) {
                    alert('Could not parse JSON file.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function reset(callback) {
        if (!confirm('Reset all progress? This cannot be undone.')) return;
        localStorage.removeItem(STORAGE_KEY);
        if (callback) callback();
    }

    return {
        load,
        save,
        loadOrInit,
        getCardProgress,
        setCardProgress,
        recordReview,
        exportProgress,
        importProgress,
        reset
    };
})();
