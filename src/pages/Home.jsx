import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlitchTitle from '../components/ui/GlitchTitle';
import SearchBar from '../components/ui/SearchBar';
import SlangCard from '../components/ui/SlangCard';
import SpongeBob3D from '../components/characters/SpongeBob3D';
import DrakeCharacter from '../components/characters/DrakeCharacter';
import { trendingWords, wordOfTheDay, randomWords } from '../utils/slangData';

export default function Home() {
    const navigate = useNavigate();
    const [showWOTD, setShowWOTD] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowWOTD(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (query) => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleRandomWord = () => {
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        navigate(`/search?q=${encodeURIComponent(word)}`);
    };

    return (
        <div className="min-h-screen pb-24 md:pb-8">
            {/* Word of the Day Banner */}
            {showWOTD && (
                <motion.div
                    className="caution-tape w-full py-2 mb-6"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                >
                    <div className="flex items-center justify-center gap-4 px-4">
                        <span className="text-off-black font-display text-lg md:text-xl tracking-wider">
                            ⚠️ WORD OF THE DAY ⚠️
                        </span>
                        <span className="text-off-black font-display text-xl md:text-3xl tracking-wider bg-off-black/10 px-3 py-0.5">
                            {wordOfTheDay.word}
                        </span>
                        <span className="text-off-black font-display text-lg md:text-xl tracking-wider hidden md:inline">
                            ⚠️ WORD OF THE DAY ⚠️
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Hero Section */}
            <div className="flex flex-col items-center gap-6 md:gap-8 px-4 pt-16 md:pt-24">
                {/* Title */}
                <GlitchTitle
                    text="NO CAP DICT"
                    className="font-display text-6xl md:text-8xl lg:text-[10rem] text-off-white tracking-wider leading-none"
                />

                <motion.p
                    className="font-accent text-hot-pink text-sm md:text-lg -mt-2 md:-mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    the slang dictionary that's actually bussin fr fr
                </motion.p>

                {/* SpongeBob Character */}
                <motion.div
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 12 }}
                >
                    <SpongeBob3D onClick={handleRandomWord} />
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    className="w-full max-w-3xl"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                >
                    <SearchBar onSearch={handleSearch} size="large" />
                </motion.div>
            </div>

            {/* Word of the Day Section with Drake */}
            <motion.div
                className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-16 md:mt-24 px-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            >
                <DrakeCharacter word={wordOfTheDay.word.split(' ')[0]} />

                <div className="max-w-lg">
                    <h2 className="font-display text-3xl md:text-4xl text-cyber-yellow mb-3 tracking-wider">
                        WORD OF THE DAY
                    </h2>
                    <h3 className="font-display text-xl md:text-2xl text-off-white mb-2">
                        {wordOfTheDay.word}
                    </h3>
                    <p className="font-body text-off-white/70 text-sm md:text-base leading-relaxed mb-3">
                        {wordOfTheDay.definition}
                    </p>
                    <div className="imessage-bubble-blue inline-block px-4 py-2">
                        <p className="text-sm italic">{wordOfTheDay.example}</p>
                    </div>
                </div>
            </motion.div>

            {/* Trending Words Grid */}
            <div className="mt-16 md:mt-24 px-4">
                <motion.h2
                    className="font-display text-3xl md:text-5xl text-brat mb-8 tracking-wider text-center"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                >
                    TRENDING RN 📈🔥
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {trendingWords.map((word, i) => (
                        <SlangCard key={word.id} data={word} index={i} />
                    ))}
                </div>
            </div>

            {/* CTA */}
            <motion.div
                className="text-center mt-16 md:mt-24 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <p className="font-accent text-off-white/40 text-sm md:text-base mb-4">
                    can't find what you're looking for? 🤷
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <motion.button
                        onClick={() => navigate('/search')}
                        className="brutal-btn brutal-btn-green"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔍 SEARCH THE DICTIONARY
                    </motion.button>
                    <motion.button
                        onClick={() => navigate('/translate')}
                        className="brutal-btn brutal-btn-pink"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔄 TRANSLATE TEXT
                    </motion.button>
                    <motion.button
                        onClick={() => navigate('/quiz')}
                        className="brutal-btn"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🎓 TAKE THE QUIZ
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
