import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import TeacherCharacter from '../components/characters/TeacherCharacter';
import { useSlangSearch } from '../hooks/useClaudeAPI';
import { quizQuestions as fallbackQuestions } from '../utils/slangData';

const verdicts = [
    { min: 9, label: 'Chronically Online', emoji: '📱', color: 'text-brat', desc: "you don't go outside and it shows (affectionate)" },
    { min: 6, label: 'Lowkey Aware', emoji: '😏', color: 'text-cyber-yellow', desc: "you've been on tiktok but you also touch grass" },
    { min: 3, label: 'Millennial in Disguise', emoji: '🫣', color: 'text-e-purple', desc: "you know some things but you still say 'adulting'" },
    { min: 0, label: 'Certified Boomer', emoji: '👴', color: 'text-hot-pink', desc: "bestie... do you still use facebook?" },
];

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [teacherState, setTeacherState] = useState('stern');
    const [timeLeft, setTimeLeft] = useState(100);
    const { getQuizQuestions, loading } = useSlangSearch();

    const startQuiz = async () => {
        const q = await getQuizQuestions();
        setQuestions(q || fallbackQuestions);
        setQuizStarted(true);
        setCurrentQ(0);
        setScore(0);
        setQuizComplete(false);
        setTeacherState('stern');
        setTimeLeft(100);
    };

    // Timer
    useEffect(() => {
        if (!quizStarted || quizComplete || showResult) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    handleAnswer(-1); // time out
                    return 100;
                }
                return prev - 1;
            });
        }, 150);
        return () => clearInterval(interval);
    }, [quizStarted, quizComplete, showResult, currentQ]);

    const handleAnswer = useCallback((answerIndex) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answerIndex);
        setShowResult(true);

        const isCorrect = answerIndex === questions[currentQ]?.correct;
        if (isCorrect) {
            setScore(prev => prev + 1);
            setTeacherState('pass');
        } else {
            setTeacherState('wrong');
        }

        setTimeout(() => {
            if (currentQ + 1 >= questions.length) {
                setQuizComplete(true);
                const finalScore = isCorrect ? score + 1 : score;
                if (finalScore >= 6) {
                    confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: { y: 0.5 },
                        colors: ['#8ACE00', '#FF2D78', '#BF00FF', '#FFE600'],
                    });
                }
            } else {
                setCurrentQ(prev => prev + 1);
                setSelectedAnswer(null);
                setShowResult(false);
                setTeacherState('stern');
                setTimeLeft(100);
            }
        }, 1500);
    }, [selectedAnswer, currentQ, questions, score]);

    const getVerdict = () => {
        return verdicts.find(v => score >= v.min) || verdicts[verdicts.length - 1];
    };

    return (
        <div className="min-h-screen pb-24 md:pb-8 pt-20 md:pt-24 px-4">
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h1 className="font-display text-4xl md:text-6xl text-off-white tracking-wider mb-2">
                    ARE YOU A BOOMER? 🎓
                </h1>
                <p className="font-accent text-cyber-yellow text-sm">
                    10 questions to expose your internet illiteracy
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Teacher Character */}
                    <motion.div
                        className="hidden md:block flex-shrink-0 sticky top-24"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <TeacherCharacter state={teacherState} score={score} />
                    </motion.div>

                    <div className="flex-1 w-full">
                        {/* Start Screen */}
                        {!quizStarted && (
                            <motion.div
                                className="text-center py-12"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <p className="text-6xl mb-6">📝</p>
                                <h2 className="font-display text-2xl md:text-3xl text-off-white mb-4">
                                    READY TO GET EXPOSED?
                                </h2>
                                <p className="font-body text-off-white/50 text-sm mb-6">
                                    10 questions. no googling. no asking your gen z cousin.
                                </p>
                                <motion.button
                                    onClick={startQuiz}
                                    className="brutal-btn brutal-btn-green text-lg px-8 py-4"
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={loading}
                                >
                                    {loading ? '🧑‍🍳 cooking questions...' : '🚀 START QUIZ'}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Quiz in progress */}
                        {quizStarted && !quizComplete && questions[currentQ] && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQ}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Progress */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-body text-off-white/40 text-sm">
                                            Question {currentQ + 1}/{questions.length}
                                        </span>
                                        <span className="font-display text-brat text-xl">
                                            Score: {score}
                                        </span>
                                    </div>

                                    {/* Timer */}
                                    <div className="w-full h-1 bg-off-white/10 mb-6 overflow-hidden">
                                        <motion.div
                                            className="h-full"
                                            style={{
                                                width: `${timeLeft}%`,
                                                background: timeLeft > 50 ? '#8ACE00' : timeLeft > 25 ? '#FFE600' : '#FF2D78',
                                                boxShadow: `0 0 10px ${timeLeft > 50 ? '#8ACE00' : timeLeft > 25 ? '#FFE600' : '#FF2D78'}`,
                                            }}
                                        />
                                    </div>

                                    {/* Question */}
                                    <div className="slang-card p-6 mb-6">
                                        <h2 className="font-display text-xl md:text-2xl text-off-white mb-2">
                                            {questions[currentQ].question}
                                        </h2>
                                    </div>

                                    {/* Options */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {questions[currentQ].options.map((option, i) => {
                                            const isSelected = selectedAnswer === i;
                                            const isCorrect = i === questions[currentQ].correct;
                                            const showState = showResult;

                                            return (
                                                <motion.button
                                                    key={i}
                                                    onClick={() => handleAnswer(i)}
                                                    className={`p-4 border-2 text-left font-body text-sm transition-all duration-100 ${showState
                                                        ? isCorrect
                                                            ? 'border-brat bg-brat/20 text-brat'
                                                            : isSelected
                                                                ? 'border-hot-pink bg-hot-pink/20 text-hot-pink'
                                                                : 'border-off-white/10 text-off-white/30'
                                                        : 'border-off-white/20 text-off-white hover:border-off-white/50 hover:bg-off-white/5'
                                                        }`}
                                                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                                                    whileHover={!showResult ? { scale: 1.02 } : {}}
                                                    whileTap={!showResult ? { scale: 0.98 } : {}}
                                                    disabled={showResult}
                                                >
                                                    <span className="text-off-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                                                    {option}
                                                    {showState && isCorrect && <span className="ml-2">✅</span>}
                                                    {showState && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Quiz Complete - Verdict */}
                        {quizComplete && (
                            <motion.div
                                className="text-center py-8"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                {(() => {
                                    const verdict = getVerdict();
                                    return (
                                        <>
                                            <motion.p
                                                className="text-7xl mb-4"
                                                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {verdict.emoji}
                                            </motion.p>
                                            <h2 className={`font-display text-4xl md:text-6xl ${verdict.color} mb-3`}>
                                                {verdict.label}
                                            </h2>
                                            <p className="font-body text-off-white/60 text-sm mb-2">{verdict.desc}</p>
                                            <p className="font-display text-2xl text-off-white mb-6">
                                                Score: {score}/{questions.length}
                                            </p>
                                            <motion.button
                                                onClick={() => { setQuizStarted(false); setQuizComplete(false); setScore(0); setCurrentQ(0); setSelectedAnswer(null); setShowResult(false); setTimeLeft(100); }}
                                                className="brutal-btn brutal-btn-green"
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                🔄 RETAKE QUIZ
                                            </motion.button>
                                        </>
                                    );
                                })()}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Teacher */}
            <div className="md:hidden fixed bottom-20 right-4 z-40 scale-75">
                <TeacherCharacter state={teacherState} score={score} />
            </div>
        </div>
    );
}
