import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from '../components/ui/TypewriterText';
import BoomerCharacter from '../components/characters/BoomerCharacter';
import { useSlangSearch } from '../hooks/useClaudeAPI';

export default function Translate() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [boomerState, setBoomerState] = useState('idle');
    const [showTypewriter, setShowTypewriter] = useState(false);
    const { translate, loading } = useSlangSearch();

    const handleTranslate = async () => {
        if (!input.trim()) return;
        setBoomerState('confused');
        setResult(null);
        setShowTypewriter(false);

        const data = await translate(input.trim());
        if (data) {
            setResult(data);
            setBoomerState('complete');
            setShowTypewriter(true);
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
                    BOOMER TRANSLATOR 🔄
                </h1>
                <p className="font-accent text-e-purple text-sm">
                    paste gen z text → get plain english your parents would understand
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    {/* Boomer Character */}
                    <motion.div
                        className="hidden md:block flex-shrink-0 sticky top-24"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <BoomerCharacter state={boomerState} />
                    </motion.div>

                    {/* Translation Area */}
                    <div className="flex-1 w-full">
                        {/* Split Screen */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Input */}
                            <div>
                                <label className="font-body text-brat text-xs uppercase tracking-widest mb-2 block">
                                    Gen Z text 🧠
                                </label>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="paste your gen z text here bestie... e.g. 'ngl that was lowkey mid, giving very much dead energy fr fr no cap'"
                                    className="w-full h-48 md:h-64 p-4 bg-off-black border-2 border-off-white/20 text-off-white font-body text-sm resize-none focus:outline-none focus:border-brat transition-colors duration-100"
                                    style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                />
                                <motion.button
                                    onClick={handleTranslate}
                                    className="brutal-btn brutal-btn-green mt-3 w-full"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading || !input.trim()}
                                >
                                    {loading ? '🧑‍🍳 cooking fr fr...' : '🔄 TRANSLATE TO BOOMER'}
                                </motion.button>
                            </div>

                            {/* Output */}
                            <div>
                                <label className="font-body text-e-purple text-xs uppercase tracking-widest mb-2 block">
                                    Plain english 👴
                                </label>
                                <div
                                    className="w-full h-48 md:h-64 p-4 bg-off-white/5 border-2 border-off-white/10 text-off-white/80 font-body text-sm overflow-y-auto"
                                    style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2 text-off-white/40">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                🧑‍🍳
                                            </motion.span>
                                            cooking fr fr...
                                        </div>
                                    ) : result ? (
                                        showTypewriter ? (
                                            <TypewriterText text={result.translation} speed={20} />
                                        ) : (
                                            <span>{result.translation}</span>
                                        )
                                    ) : (
                                        <span className="text-off-white/20 italic">
                                            translation will appear here...
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <AnimatePresence>
                            {result && result.breakdown && (
                                <motion.div
                                    className="mt-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="font-body text-hot-pink text-xs uppercase tracking-widest mb-3">
                                        Word-by-word breakdown:
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {result.breakdown.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex gap-2 items-start p-3 bg-off-white/5 border border-off-white/10"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 + i * 0.1 }}
                                            >
                                                <span className="font-body text-brat text-sm font-bold whitespace-nowrap">
                                                    "{item.slang}"
                                                </span>
                                                <span className="text-off-white/40 text-sm">→</span>
                                                <span className="font-body text-off-white/70 text-sm">
                                                    {item.meaning}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Boomer Reaction */}
                                    {result.boomerReaction && (
                                        <motion.div
                                            className="mt-4 p-4 bg-e-purple/10 border-2 border-e-purple/30"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 1 }}
                                        >
                                            <p className="font-accent text-e-purple text-base">
                                                👴 Boomer reaction: "{result.boomerReaction}"
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Mobile Boomer */}
            <div className="md:hidden fixed bottom-20 right-4 z-40 scale-75">
                <BoomerCharacter state={boomerState} />
            </div>
        </div>
    );
}
