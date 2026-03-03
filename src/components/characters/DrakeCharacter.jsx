import { motion } from 'framer-motion';

const DRAKE_GIF = '/characters/drake.png';

export default function DrakeCharacter({ word = 'UNDERSTOOD' }) {
    return (
        <motion.div
            className="relative select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="relative w-36 md:w-44">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-e-purple/15 blur-2xl" />

                {/* GIF */}
                <img
                    src={DRAKE_GIF}
                    alt="Drake approving"
                    className="relative w-full h-auto rounded-2xl border-2 border-e-purple/30 drop-shadow-[0_0_15px_rgba(191,0,255,0.3)]"
                    loading="lazy"
                />

                {/* Word sign */}
                <motion.div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cyber-yellow text-off-black px-3 py-1 font-display text-sm tracking-wider border-2 border-off-black whitespace-nowrap"
                    animate={{ rotate: [-1, 1, -1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {word}
                </motion.div>

                {/* Label */}
                <motion.div
                    className="absolute -right-2 top-2 bg-e-purple/80 text-off-white px-2 py-0.5 text-[9px] font-accent"
                    animate={{ rotate: [0, 3, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    *certified lean*
                </motion.div>
            </div>
        </motion.div>
    );
}
