import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import SlangCard from '../components/ui/SlangCard';
import TypewriterText from '../components/ui/TypewriterText';
import NickiCharacter from '../components/characters/NickiCharacter';
import { useSlangSearch } from '../hooks/useClaudeAPI';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [result, setResult] = useState(null);
    const [nickiState, setNickiState] = useState('idle');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const { searchWord, loading } = useSlangSearch();

    // Handle initial search from URL params
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            handleSearch(q);
        }
    }, []);

    const handleSearch = async (query) => {
        setNickiState('searching');
        setResult(null);
        setShowTypewriter(false);

        const data = await searchWord(query);

        if (data) {
            setResult(data);
            setNickiState('found');
            setShowTypewriter(true);
            setSearchHistory(prev => {
                const updated = [query, ...prev.filter(w => w.toLowerCase() !== query.toLowerCase())];
                return updated.slice(0, 10);
            });
            setSearchParams({ q: query });
        } else {
            setNickiState('notfound');
        }
    };

    return (
        <div className="min-h-screen pb-24 md:pb-8 pt-20 md:pt-24 px-4">
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h1 className="font-display text-4xl md:text-6xl text-off-white tracking-wider mb-2">
                    DICTIONARY 📖
                </h1>
                <p className="font-accent text-hot-pink text-sm">
                    powered by AI that's chronically online
                </p>
            </motion.div>

            {/* Search + Nicki Character */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Nicki */}
                <motion.div
                    className="hidden md:block flex-shrink-0"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                >
                    <NickiCharacter state={nickiState} />
                </motion.div>

                {/* Search Bar */}
                <div className="flex-1 w-full">
                    <SearchBar onSearch={handleSearch} size="normal" />
                </div>
            </div>

            {/* Loading State */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="text-4xl mb-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            🧑‍🍳
                        </motion.div>
                        <p className="font-accent text-brat text-lg">cooking fr fr...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results */}
            <AnimatePresence>
                {result && !loading && (
                    <motion.div
                        className="max-w-4xl mx-auto mt-8 md:mt-12"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                    >
                        {/* Definition Card */}
                        <div className="slang-card p-6 md:p-8 mb-6">
                            {/* Word */}
                            <h2 className="font-display text-4xl md:text-6xl text-off-white mb-4 tracking-wider">
                                {result.word}
                            </h2>

                            {/* Outdated Warning */}
                            {result.isOutdated && (
                                <motion.div
                                    className="inline-block bg-cyber-yellow/10 border-2 border-cyber-yellow/40 px-4 py-2 mb-4"
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                >
                                    <span className="text-cyber-yellow font-body text-sm font-bold">
                                        ⚠️ WARNING: this word is giving 2019 energy. use at your own risk bestie.
                                    </span>
                                </motion.div>
                            )}

                            {/* Chaos Level */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-body text-off-white/40 uppercase tracking-widest">chaos level:</span>
                                <div className="flex gap-1">
                                    {['😇', '😏', '😈', '🤪', '💀'].map((emoji, i) => (
                                        <motion.span
                                            key={i}
                                            className={`text-lg ${i < (result.chaosLevel || 1) ? 'opacity-100' : 'opacity-20'}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            {emoji}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Definition with typewriter */}
                            <div className="mb-6">
                                <h3 className="font-body text-brat text-sm uppercase tracking-widest mb-2">Definition:</h3>
                                {showTypewriter ? (
                                    <TypewriterText
                                        text={result.definition}
                                        speed={15}
                                        className="font-body text-off-white/80 text-base md:text-lg leading-relaxed"
                                    />
                                ) : (
                                    <p className="font-body text-off-white/80 text-base md:text-lg leading-relaxed">
                                        {result.definition}
                                    </p>
                                )}
                            </div>

                            {/* Example as iMessage */}
                            <div className="mb-6">
                                <h3 className="font-body text-hot-pink text-sm uppercase tracking-widest mb-2">Example:</h3>
                                <div className="imessage-bubble inline-block">
                                    <p className="text-sm italic text-off-white/80">{result.example}</p>
                                </div>
                            </div>

                            {/* Mom Says */}
                            {result.momSays && (
                                <div className="mb-6 p-4 bg-hot-pink/5 border-l-4 border-hot-pink">
                                    <h3 className="font-body text-hot-pink text-sm uppercase tracking-widest mb-1">Your mom would say:</h3>
                                    <p className="font-accent text-hot-pink text-base">"{result.momSays}"</p>
                                </div>
                            )}

                            {/* Related Words */}
                            {result.relatedWords && result.relatedWords.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-body text-e-purple text-sm uppercase tracking-widest mb-2">Related:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.relatedWords.map((word, i) => (
                                            <motion.button
                                                key={i}
                                                className="tag-chip"
                                                onClick={() => handleSearch(word)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                            >
                                                {word}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {result.tags && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {result.tags.map((tag, i) => (
                                        <span key={i} className="text-xs text-off-white/30 font-body">{tag}</span>
                                    ))}
                                </div>
                            )}

                            {/* Ratio Score */}
                            {result.ratioScore && (
                                <motion.div
                                    className="mt-6 pt-4 border-t border-off-white/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-body text-xs text-off-white/40 uppercase tracking-widest">ratio my vocab:</span>
                                        <div className="flex-1 h-2 bg-off-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-brat to-e-purple"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${result.ratioScore}%` }}
                                                transition={{ duration: 1, delay: 1.2 }}
                                            />
                                        </div>
                                        <span className="font-display text-lg text-brat">{result.ratioScore}/100</span>
                                    </div>
                                    <p className="text-xs text-off-white/30 font-body mt-1">
                                        {result.ratioScore > 75 ? "elite vocab, you're too powerful 👑" :
                                            result.ratioScore > 50 ? "decent, you've been on tiktok" :
                                                result.ratioScore > 25 ? "basic but ok bestie" : "everyone knows this one fr"}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search History */}
            {searchHistory.length > 0 && (
                <motion.div
                    className="max-w-4xl mx-auto mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h3 className="font-body text-off-white/30 text-xs uppercase tracking-widest mb-3">Search history:</h3>
                    <div className="flex flex-wrap gap-2">
                        {searchHistory.map((word, i) => (
                            <motion.button
                                key={`${word}-${i}`}
                                onClick={() => handleSearch(word)}
                                className="px-3 py-1 text-xs font-body text-off-white/50 bg-off-white/5 border border-off-white/10 hover:border-brat hover:text-brat transition-all duration-100"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {word}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Empty state */}
            {!result && !loading && !searchParams.get('q') && (
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-4xl mb-4">🔍</p>
                    <p className="font-accent text-off-white/30 text-lg">
                        search for any slang word and let AI cook the definition
                    </p>
                </motion.div>
            )}

            {/* Mobile Nicki */}
            <div className="md:hidden fixed bottom-20 right-4 z-40">
                <NickiCharacter state={nickiState} />
            </div>
        </div>
    );
}
