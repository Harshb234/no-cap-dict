import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [trails, setTrails] = useState([]);
    const trailId = useRef(0);

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) return;

        const move = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            trailId.current += 1;
            setTrails(prev => [...prev.slice(-6), { id: trailId.current, x: e.clientX, y: e.clientY }]);
        };

        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    useEffect(() => {
        if (trails.length > 0) {
            const timer = setTimeout(() => {
                setTrails(prev => prev.slice(1));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [trails]);

    return (
        <>
            <div
                className="cursor-dot"
                style={{ left: pos.x - 12, top: pos.y - 12 }}
            >
                🔥
            </div>
            {trails.map((t) => (
                <div
                    key={t.id}
                    className="cursor-trail"
                    style={{ left: t.x - 8, top: t.y - 8 }}
                >
                    ✨
                </div>
            ))}
        </>
    );
}
