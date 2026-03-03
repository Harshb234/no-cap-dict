import { motion } from 'framer-motion';

const UZI_GIF = 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif';

export default function UziFooter() {
    return (
        <motion.div
            className="relative select-none"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="relative w-12 h-12 md:w-14 md:h-14">
                <img
                    src={UZI_GIF}
                    alt="Vibing with headphones"
                    className="w-full h-full object-cover rounded-full border-2 border-e-purple/40 drop-shadow-[0_0_8px_rgba(191,0,255,0.3)]"
                    loading="lazy"
                />
                {/* Headphone emoji */}
                <span className="absolute -top-1 -right-1 text-sm">🎧</span>
            </div>
        </motion.div>
    );
}
