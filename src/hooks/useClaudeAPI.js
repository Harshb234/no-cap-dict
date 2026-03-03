import { useState, useCallback } from 'react';
import {
    searchLocal,
    searchUrbanDictionary,
    translateGenZLocally,
    allQuizQuestions,
    chaosEmojis,
} from '../utils/slangData';

export function useSlangSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchWord = useCallback(async (word) => {
        setLoading(true);
        setError(null);

        try {
            // Step 1: Search local database first
            const local = searchLocal(word);
            if (local) {
                // Small delay for UX (feels like it's "cooking")
                await new Promise(r => setTimeout(r, 400));
                setLoading(false);
                return {
                    ...local,
                    ratioScore: local.stillCool ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30) + 10,
                    upvotes: Math.floor(Math.random() * 500) + 50,
                    downvotes: Math.floor(Math.random() * 50) + 5,
                };
            }

            // Step 2: Try Urban Dictionary API
            const urban = await searchUrbanDictionary(word);
            if (urban) {
                setLoading(false);
                return {
                    word: urban.word,
                    definition: urban.definition,
                    example: urban.example,
                    chaosLevel: Math.floor(Math.random() * 5) + 1,
                    tags: ['#urban-dictionary', '#internet'],
                    stillCool: true,
                    momSays: `${word}? In my day we just spoke ENGLISH!`,
                    relatedWords: [],
                    ratioScore: Math.floor(Math.random() * 50) + 30,
                    upvotes: urban.upvotes || 0,
                    downvotes: urban.downvotes || 0,
                    source: 'urban',
                };
            }

            // Step 3: Not found
            setLoading(false);
            return null;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return null;
        }
    }, []);

    const translate = useCallback(async (text) => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(r => setTimeout(r, 600));
            const result = translateGenZLocally(text);
            setLoading(false);
            return result;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return null;
        }
    }, []);

    const getQuizQuestions = useCallback(async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 300));
        const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5);
        setLoading(false);
        return shuffled.slice(0, 10);
    }, []);

    return { searchWord, translate, getQuizQuestions, loading, error };
}
