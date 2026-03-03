import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const BOOMER_GIFS = {
    idle: 'https://media.giphy.com/media/WRQBXSCnEFJIuxktnw/giphy.gif',
    confused: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
    complete: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
};

const SPEECH = {
    idle: 'Kids these days...',
    confused: 'What does that mean??',
    complete: 'I... understand now?!',
};

export default function BoomerCharacter({ state = 'idle' }) {
    const prevState = useRef(state);

    useEffect(() => {
        if (state === 'complete' && prevState.current !== 'complete') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8ACE00', '#FF2D78', '#BF00FF', '#FFE600'],
            });
        }
        prevState.current = state;
    }, [state]);

    const gif = BOOMER_GIFS[state] || BOOMER_GIFS.idle;
    const speech = SPEECH[state] || SPEECH.idle;

    return (
        <motion.div
            className="relative select-none"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="relative w-32 md:w-40">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-blue-400/15 blur-2xl" />

                {/* GIF */}
                <motion.img
                    key={state}
                    src={gif}
                    alt={`Boomer ${state}`}
                    className="relative w-full h-auto rounded-2xl border-2 border-blue-400/30 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]"
                    loading="lazy"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                />

                {/* Speech bubble */}
                <motion.div
                    className="absolute -left-4 -top-3 bg-blue-400 text-off-black px-3 py-1.5 text-[10px] md:text-xs font-body font-bold whitespace-nowrap z-10 max-w-[140px]"
                    key={`speech-${state}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    👴 {speech}
                </motion.div>
            </div>
        </motion.div>
    );
}
