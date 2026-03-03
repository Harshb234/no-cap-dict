import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GlitchTitle({ text, className = '', as = 'h1' }) {
    const [displayText, setDisplayText] = useState('');
    const [isGlitching, setIsGlitching] = useState(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}';
    const intervalRef = useRef(null);

    useEffect(() => {
        let iteration = 0;
        const scramble = () => {
            intervalRef.current = setInterval(() => {
                setDisplayText(
                    text.split('').map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < iteration) return text[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('')
                );
                iteration += 1 / 2;
                if (iteration >= text.length) {
                    clearInterval(intervalRef.current);
                    setDisplayText(text);
                    setIsGlitching(false);
                }
            }, 30);
        };

        const timeout = setTimeout(scramble, 300);
        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    const Tag = as;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Tag
                className={`glitch-text ${className}`}
                data-text={displayText}
            >
                {displayText}
            </Tag>
        </motion.div>
    );
}
