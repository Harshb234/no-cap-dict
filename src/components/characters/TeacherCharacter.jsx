import { motion } from 'framer-motion';

const TEACHER_GIFS = {
    stern: 'https://media.giphy.com/media/3ohzAu2U1tOafteBa0/giphy.gif',
    judging: 'https://media.giphy.com/media/l0IylOPCNkiqOgMyA/giphy.gif',
    hype: 'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif',
};

const SPEECH = {
    stern: '📋 pop quiz time...',
    judging: '😐 really? that answer?',
    hype: '🎉 you passed the vibe check!',
};

export default function TeacherCharacter({ state = 'stern' }) {
    const gif = TEACHER_GIFS[state] || TEACHER_GIFS.stern;
    const speech = SPEECH[state] || SPEECH.stern;

    return (
        <motion.div
            className="relative select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="relative w-32 md:w-40">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-cyber-yellow/15 blur-2xl" />

                {/* GIF */}
                <motion.img
                    key={state}
                    src={gif}
                    alt={`Teacher ${state}`}
                    className="relative w-full h-auto rounded-2xl border-2 border-cyber-yellow/30 drop-shadow-[0_0_15px_rgba(255,230,0,0.3)]"
                    loading="lazy"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                />

                {/* Speech bubble */}
                <motion.div
                    className="absolute -right-2 -top-3 bg-cyber-yellow text-off-black px-3 py-1.5 text-[10px] md:text-xs font-body font-bold whitespace-nowrap z-10"
                    key={`speech-${state}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    {speech}
                </motion.div>
            </div>
        </motion.div>
    );
}
