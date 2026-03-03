import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const bgEmojis = ['💀', '🔥', '✨', '🫨', '🗿', '💅', '👑', '🫠', '⚡', '🎭', '🤡', '👻', '🧠', '💊'];

function FloatingEmoji({ emoji, delay }) {
    const randomX = Math.random() * 100;
    const randomDuration = 15 + Math.random() * 20;
    const randomSize = 16 + Math.random() * 28;
    const randomRotation = Math.random() * 360;

    return (
        <motion.div
            className="fixed pointer-events-none select-none z-0"
            style={{
                left: `${randomX}%`,
                fontSize: `${randomSize}px`,
            }}
            initial={{ y: '110vh', rotate: 0, opacity: 0 }}
            animate={{
                y: '-10vh',
                rotate: randomRotation,
                opacity: [0, 0.15, 0.15, 0],
            }}
            transition={{
                duration: randomDuration,
                delay: delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {emoji}
        </motion.div>
    );
}

export default function FloatingEmojis() {
    const [emojis] = useState(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            emoji: bgEmojis[Math.floor(Math.random() * bgEmojis.length)],
            delay: Math.random() * 15,
        }))
    );

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {emojis.map((e) => (
                <FloatingEmoji key={e.id} emoji={e.emoji} delay={e.delay} />
            ))}
        </div>
    );
}
