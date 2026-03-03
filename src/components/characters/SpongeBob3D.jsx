import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SPONGEBOB_GIF = 'https://media.tenor.com/OWzDHA8TCKcAAAAM/spongebob-spongebob-squarepants.gif';

export default function SpongeBob3D() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/random');
    };

    return (
        <motion.div
            className="relative cursor-pointer select-none group"
            onClick={handleClick}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto">
                {/* Glow effect behind */}
                <div className="absolute inset-0 rounded-2xl bg-cyber-yellow/20 blur-2xl group-hover:bg-cyber-yellow/40 transition-all" />

                {/* GIF */}
                <img
                    src={SPONGEBOB_GIF}
                    alt="SpongeBob imagination"
                    className="relative w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,230,0,0.4)] rounded-2xl"
                    loading="lazy"
                />

                {/* Click prompt */}
                <motion.p
                    className="text-center font-accent text-off-white/40 text-xs mt-2"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    click me for a random word 🎲
                </motion.p>
            </div>
        </motion.div>
    );
}
