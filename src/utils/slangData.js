import slangDB from '../data/slang.json';
import quizDB from '../data/quiz.json';

// ===== LOCAL SLANG DATABASE HELPERS =====
export const allWords = slangDB.words;

export const trendingWords = allWords
    .filter(w => w.stillCool)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((w, i) => ({
        ...w,
        id: i + 1,
        upvotes: Math.floor(Math.random() * 500) + 50,
        downvotes: Math.floor(Math.random() * 50) + 5,
    }));

export const wordOfTheDay = (() => {
    const dayIndex = new Date().getDate() % allWords.length;
    const w = allWords[dayIndex];
    return {
        ...w,
        relatedWords: w.relatedWords || [],
    };
})();

export const randomWords = allWords.map(w => w.word);

export const quizQuestions = (() => {
    const shuffled = [...quizDB.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
})();

export const allQuizQuestions = quizDB.questions;

export const chaosEmojis = ['😇', '😏', '😈', '🤪', '💀'];
export const chaosLabels = ['innocent', 'lowkey', 'chaotic', 'unhinged', 'DECEASED'];

export const searchPlaceholders = [
    "search: rizz...",
    "search: situationship...",
    "search: understood the assignment...",
    "search: roman empire...",
    "search: delulu...",
    "search: brat summer...",
    "search: skibidi...",
    "search: main character energy...",
];

// ===== LOCAL SEARCH =====
export function searchLocal(query) {
    const q = query.toLowerCase().trim();
    const exact = allWords.find(w => w.word.toLowerCase() === q);
    if (exact) return exact;
    const partial = allWords.find(w => w.word.toLowerCase().includes(q));
    return partial || null;
}

// ===== SLANG DICTIONARY FOR TRANSLATION =====
const slangDictionary = {};
allWords.forEach(w => {
    slangDictionary[w.word.toLowerCase()] = w.definition.split('.')[0];
});

// Additional common terms not in main DB
Object.assign(slangDictionary, {
    "fr": "for real",
    "fr fr": "for real for real (seriously)",
    "ngl": "not gonna lie",
    "tbh": "to be honest",
    "imo": "in my opinion",
    "idk": "I don't know",
    "smh": "shaking my head",
    "bruh": "an expression of disbelief or exasperation",
    "sis": "sister (term of address)",
    "fam": "family / close friends",
    "dead": "something extremely funny",
    "woke": "socially aware and conscious",
    "salty": "upset or bitter about something",
    "savage": "brutally honest, no filter",
    "lit": "exciting, fun, excellent",
    "vibe": "a feeling or atmosphere",
    "mood": "relatable, same feeling",
    "boutta": "about to",
    "lowk": "lowkey",
    "nah": "no",
    "istg": "I swear to God",
    "ong": "on God (for real)",
    "wya": "where you at",
    "hmu": "hit me up",
    "iykyk": "if you know you know",
    "fyp": "for you page (TikTok)",
    "pov": "point of view",
    "oomf": "one of my followers",
    "opp": "opponent / opposition",
    "dw": "don't worry",
    "lmk": "let me know",
    "ion": "I don't",
    "atp": "at this point",
    "sus": "suspicious",
});

export function translateGenZLocally(text) {
    const words = Object.keys(slangDictionary).sort((a, b) => b.length - a.length);
    let translation = text;
    const breakdown = [];

    for (const slang of words) {
        const regex = new RegExp(`\\b${slang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        if (regex.test(text)) {
            breakdown.push({ slang, meaning: slangDictionary[slang] });
            translation = translation.replace(regex, slangDictionary[slang]);
        }
    }

    return {
        original: text,
        translation: breakdown.length > 0 ? translation : "Hmm, couldn't find any slang in that text. Either you're already speaking boomer or that's too advanced even for us bestie.",
        breakdown: breakdown.length > 0 ? breakdown : [{ slang: text, meaning: "No slang detected — you might already be a boomer 👴" }],
        boomerReaction: breakdown.length > 3
            ? "I understood NONE of that and I have a PhD!"
            : breakdown.length > 0
                ? "Back in MY day we used REAL words!"
                : "Wait... I actually understood that one!",
    };
}

// ===== URBAN DICTIONARY API (FREE) =====
export async function searchUrbanDictionary(word) {
    try {
        const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.list || data.list.length === 0) return null;
        const top = data.list[0];
        return {
            word: top.word,
            definition: top.definition.replace(/\[|\]/g, ''),
            example: top.example.replace(/\[|\]/g, ''),
            source: 'urban',
            upvotes: top.thumbs_up,
            downvotes: top.thumbs_down,
        };
    } catch {
        return null;
    }
}

// ===== FREE DICTIONARY API (FALLBACK) =====
export async function searchFreeDictionary(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data[0]) return null;
        const entry = data[0];
        const meaning = entry.meanings?.[0];
        return {
            word: entry.word,
            definition: meaning?.definitions?.[0]?.definition || '',
            example: meaning?.definitions?.[0]?.example || '',
            source: 'dictionary',
            phonetic: entry.phonetic || '',
        };
    } catch {
        return null;
    }
}
