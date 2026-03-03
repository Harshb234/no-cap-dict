import { motion } from 'framer-motion';

const NICKI_GIFS = {
    idle: '/characters/nicki-idle.png',
    searching: '/characters/nicki-searching.png',
    found: '/characters/nicki-found.png',
    notFound: '/characters/nicki-idle.png',
};

const SPEECH = {
    idle: '💅 search something bestie',
    searching: '👀 lemme cook...',
    found: '✨ found it queen!',
    notFound: '🤷‍♀️ that ain\'t it chief',
};

export default function NickiCharacter({ state = 'idle' }) {
    const gif = NICKI_GIFS[state] || NICKI_GIFS.idle;
    const speech = SPEECH[state] || SPEECH.idle;

    return (
        <motion.div
            className="relative select-none"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <div className="relative w-36 md:w-48">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-hot-pink/15 blur-2xl" />

                {/* GIF */}
                <motion.img
                    key={state}
                    src={gif}
                    alt={`Nicki Minaj ${state}`}
                    className="relative w-full h-auto rounded-2xl border-2 border-hot-pink/30 drop-shadow-[0_0_15px_rgba(255,45,120,0.3)]"
                    loading="lazy"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                />

                {/* Speech bubble */}
                <motion.div
                    className="absolute -right-2 -top-3 bg-hot-pink text-off-black px-3 py-1.5 text-xs font-body font-bold whitespace-nowrap z-10"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 75% 70%, 60% 100%, 50% 70%, 0 70%)' }}
                    key={`speech-${state}`}
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    {speech}
                </motion.div>
            </div>
        </motion.div>
    );
}
