import { useState } from 'react';
import { motion } from 'framer-motion';
import { chaosEmojis, chaosLabels } from '../../utils/slangData';

export default function SlangCard({ data, index = 0, compact = false }) {
    const [showMom, setShowMom] = useState(false);
    const [votes, setVotes] = useState({ up: data.upvotes || 0, down: data.downvotes || 0 });
    const [voted, setVoted] = useState(null);

    const rotation = ((index % 5) - 2) * 0.8;
    const chaos = Math.min(Math.max((data.chaosLevel || 1) - 1, 0), 4);

    const handleVote = (type) => {
        if (voted === type) return;
        setVotes(prev => ({
            up: type === 'up' ? prev.up + 1 : (voted === 'up' ? prev.up - 1 : prev.up),
            down: type === 'down' ? prev.down + 1 : (voted === 'down' ? prev.down - 1 : prev.down),
        }));
        setVoted(type);
    };

    return (
        <motion.div
            className="slang-card p-4 md:p-6"
            style={{ transform: `rotate(${rotation}deg)` }}
            initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
            animate={{ opacity: 1, y: 0, rotate: rotation }}
            transition={{ delay: index * 0.08, duration: 0.3, type: 'spring', stiffness: 300 }}
            whileHover={{ y: -8, rotate: 0, transition: { duration: 0.1 } }}
        >
            {/* Word */}
            <h3 className="font-display text-3xl md:text-4xl text-off-white mb-1 tracking-wide">
                {data.word}
            </h3>

            {/* Chaos Level */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-body text-off-white/40 uppercase tracking-widest">chaos:</span>
                <div className="flex gap-1">
                    {chaosEmojis.map((emoji, i) => (
                        <span key={i} className={`text-sm ${i <= chaos ? 'opacity-100' : 'opacity-20'} transition-opacity`}>
                            {emoji}
                        </span>
                    ))}
                </div>
                <span className="text-xs text-brat font-bold">{chaosLabels[chaos]}</span>
            </div>

            {/* Outdated Warning */}
            {data.isOutdated && (
                <div className="text-xs text-cyber-yellow bg-cyber-yellow/10 border border-cyber-yellow/30 px-2 py-1 mb-3 inline-block font-body"
                    style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                    ⚠️ giving 2019 energy
                </div>
            )}

            {/* Definition */}
            {!compact && (
                <p className="text-off-white/70 font-body text-sm leading-relaxed mb-3">
                    {data.definition}
                </p>
            )}

            {/* Example */}
            <div className="imessage-bubble mb-4">
                <p className="text-sm italic text-off-white/80 font-body">{data.example}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {(data.tags || []).map((tag, i) => (
                    <span key={i} className="tag-chip">{tag}</span>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
                {/* Vote */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-off-white/40 font-body uppercase tracking-widest">sus or secure?</span>
                    <motion.button
                        onClick={() => handleVote('up')}
                        className={`text-lg p-1 transition-all duration-100 ${voted === 'up' ? 'scale-125 drop-shadow-lg' : 'opacity-60 hover:opacity-100'}`}
                        whileTap={{ scale: 1.4 }}
                    >
                        👍
                    </motion.button>
                    <span className="text-xs text-brat font-bold font-body">{votes.up}</span>
                    <motion.button
                        onClick={() => handleVote('down')}
                        className={`text-lg p-1 transition-all duration-100 ${voted === 'down' ? 'scale-125 drop-shadow-lg' : 'opacity-60 hover:opacity-100'}`}
                        whileTap={{ scale: 1.4 }}
                    >
                        👎
                    </motion.button>
                    <span className="text-xs text-hot-pink font-bold font-body">{votes.down}</span>
                </div>

                {/* Mom Says */}
                <motion.button
                    onClick={() => setShowMom(!showMom)}
                    className="brutal-btn brutal-btn-pink text-[10px] py-1 px-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {showMom ? '🙈 hide' : '👵 mom says it'}
                </motion.button>
            </div>

            {/* Mom Mispronunciation */}
            {showMom && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-hot-pink/10 border border-hot-pink/30"
                >
                    <p className="text-sm font-accent text-hot-pink">
                        Your mom: "{data.momSays}"
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
