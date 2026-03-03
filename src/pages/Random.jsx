import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlangCard from '../components/ui/SlangCard';
import { useSlangSearch } from '../hooks/useClaudeAPI';
import { randomWords } from '../utils/slangData';

export default function Random() {
    const [result, setResult] = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [diceRolling, setDiceRolling] = useState(false);
    const { searchWord, loading } = useSlangSearch();

    const handleRandom = async () => {
        setDiceRolling(true);
        setIsFlipping(true);
        setResult(null);

        const word = randomWords[Math.floor(Math.random() * randomWords.length)];

        // Dice roll animation delay
        await new Promise(r => setTimeout(r, 800));
        setDiceRolling(false);

        const data = await searchWord(word);
        if (data) {
            setResult(data);
        }
        setTimeout(() => setIsFlipping(false), 300);
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
                    RANDOM WORD 🎲
                </h1>
                <p className="font-accent text-brat text-sm">
                    let fate decide your next vocabulary addition
                </p>
            </motion.div>

            <div className="max-w-2xl mx-auto text-center">
                {/* Dice Button */}
                <motion.button
                    onClick={handleRandom}
                    className="relative mb-12"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={loading}
                >
                    <motion.div
                        className="w-32 h-32 md:w-40 md:h-40 mx-auto flex items-center justify-center border-4 border-brat bg-off-black text-6xl md:text-7xl"
                        style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}
                        animate={diceRolling ? {
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.2, 0.9, 1.1, 1],
                        } : { rotate: 0 }}
                        transition={diceRolling ? { duration: 0.8, ease: 'easeInOut' } : {}}
                    >
                        {loading ? '🧑‍🍳' : '🎲'}
                    </motion.div>
                    <p className="font-body text-off-white/40 text-sm mt-3">
                        {loading ? 'cooking fr fr...' : 'click to roll'}
                    </p>

                    {/* Glow effect */}
                    <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 mx-auto rounded-lg blur-2xl opacity-20 bg-brat -z-10" />
                </motion.button>

                {/* Result with 3D flip */}
                <AnimatePresence mode="wait">
                    {result && (
                        <motion.div
                            key={result.word}
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                            style={{ perspective: '1000px' }}
                        >
                            <div className="max-w-lg mx-auto">
                                <SlangCard data={{
                                    ...result,
                                    upvotes: Math.floor(Math.random() * 500) + 50,
                                    downvotes: Math.floor(Math.random() * 50) + 5,
                                }} index={0} />
                            </div>

                            {/* Roll Again */}
                            <motion.button
                                onClick={handleRandom}
                                className="brutal-btn brutal-btn-pink mt-6"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                🎲 ROLL AGAIN
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Word pool preview */}
                {!result && !loading && (
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="font-body text-off-white/20 text-xs uppercase tracking-widest mb-4">
                            {randomWords.length} words in the pool
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                            {randomWords.slice(0, 15).map((word, i) => (
                                <motion.span
                                    key={word}
                                    className="text-xs px-2 py-1 border border-off-white/5 text-off-white/15 font-body"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.03 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                            <span className="text-xs px-2 py-1 text-off-white/10 font-body">
                                +{randomWords.length - 15} more...
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
