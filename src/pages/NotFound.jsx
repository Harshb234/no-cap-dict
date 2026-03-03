import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
            >
                {/* Sad character */}
                <motion.div
                    className="text-8xl mb-6"
                    animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    💀
                </motion.div>

                {/* 404 */}
                <h1 className="font-display text-8xl md:text-[12rem] text-off-white/10 leading-none mb-4">
                    404
                </h1>

                {/* Message */}
                <h2 className="font-display text-2xl md:text-4xl text-off-white mb-2">
                    bestie this page ghosted us
                </h2>
                <p className="font-accent text-hot-pink text-sm mb-8">
                    it really said "new phone who dis" 😭
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <motion.button
                        onClick={() => navigate('/')}
                        className="brutal-btn brutal-btn-green"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🏠 GO HOME
                    </motion.button>
                    <motion.button
                        onClick={() => navigate('/search')}
                        className="brutal-btn brutal-btn-pink"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔍 SEARCH INSTEAD
                    </motion.button>
                </div>

                {/* Floating sad emojis */}
                {['😭', '👻', '💔', '🫥'].map((emoji, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl opacity-20"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + (i % 2) * 30}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
