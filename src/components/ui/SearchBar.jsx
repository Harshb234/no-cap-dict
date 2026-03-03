import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { searchPlaceholders } from '../../utils/slangData';

export default function SearchBar({ onSearch, size = 'large' }) {
    const [query, setQuery] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex(i => (i + 1) % searchPlaceholders.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const isLarge = size === 'large';

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto"
            animate={{
                scale: isFocused ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <div className={`relative border-2 ${isFocused ? 'border-brat neon-border-green' : 'border-off-white/20'} bg-off-black/80 backdrop-blur-sm transition-all duration-100`}
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
                <div className="flex items-center gap-3 px-4 md:px-6">
                    <span className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'} select-none`}>🔍</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={searchPlaceholders[placeholderIndex]}
                        className={`flex-1 bg-transparent ${isLarge ? 'py-5 md:py-6 text-lg md:text-2xl' : 'py-3 md:py-4 text-base md:text-lg'} font-body text-off-white placeholder:text-off-white/30 focus:outline-none`}
                    />
                    <motion.button
                        type="submit"
                        className="brutal-btn brutal-btn-green text-xs md:text-sm whitespace-nowrap"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        NO CAP
                    </motion.button>
                </div>
            </div>
            {!query && !isFocused && (
                <p className="text-off-white/30 text-sm mt-2 text-center font-body">
                    you can't be that lost bestie, type something
                </p>
            )}
        </motion.form>
    );
}
