import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navigation from './components/ui/Navigation';
import CustomCursor from './components/ui/CustomCursor';
import FloatingEmojis from './components/ui/FloatingEmojis';
import UziFooter from './components/characters/UziFooter';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Translate = lazy(() => import('./pages/Translate'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Random = lazy(() => import('./pages/Random'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
function LoadingScreen() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <motion.div
                className="text-5xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
                🧑‍🍳
            </motion.div>
            <p className="font-accent text-brat text-lg">cooking fr fr...</p>
        </div>
    );
}

// Animated page wrapper
function PageTransition({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.15 }}
        >
            {children}
        </motion.div>
    );
}

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}><Home /></Suspense>
                    </PageTransition>
                } />
                <Route path="/search" element={
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}><Search /></Suspense>
                    </PageTransition>
                } />
                <Route path="/translate" element={
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}><Translate /></Suspense>
                    </PageTransition>
                } />
                <Route path="/quiz" element={
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}><Quiz /></Suspense>
                    </PageTransition>
                } />
                <Route path="/random" element={
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}><Random /></Suspense>
                    </PageTransition>
                } />
                <Route path="*" element={
                    <PageTransition>
                        <Suspense fallback={<LoadingScreen />}><NotFound /></Suspense>
                    </PageTransition>
                } />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <Router>
            <div className="relative min-h-screen bg-off-black overflow-hidden">
                {/* Grain overlay */}
                <div className="grain-overlay" />

                {/* Floating background emojis */}
                <FloatingEmojis />

                {/* Custom cursor */}
                <CustomCursor />

                {/* Navigation */}
                <Navigation />

                {/* Main content */}
                <main className="relative z-10">
                    <AnimatedRoutes />
                </main>

                {/* Footer */}
                <footer className="relative z-10 border-t-2 border-off-white/5 mt-16 py-8 px-4 mb-16 md:mb-0">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <UziFooter />
                            <div>
                                <p className="font-accent text-off-white/30 text-sm">
                                    made with delusion and hot cheetos 🔥 no cap
                                </p>
                                <p className="font-body text-off-white/15 text-xs mt-1">
                                    © 2026 No Cap Dict — all rights reserved bestie
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-off-white/20 text-xs font-body hover:text-brat transition-colors cursor-none">
                                Terms (jk)
                            </span>
                            <span className="text-off-white/20 text-xs font-body hover:text-hot-pink transition-colors cursor-none">
                                Privacy (LOL)
                            </span>
                            <span className="text-off-white/20 text-xs font-body hover:text-e-purple transition-colors cursor-none">
                                Contact (don't)
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}
