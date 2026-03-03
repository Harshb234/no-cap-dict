import { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 20, className = '', onComplete }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setDone(true);
                onComplete?.();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span className={`${className} ${!done ? 'typing-cursor' : ''}`}>
            {displayed}
        </span>
    );
}
