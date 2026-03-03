import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/translate', label: 'Translate', icon: '🔄' },
    { path: '/quiz', label: 'Quiz', icon: '🎓' },
    { path: '/random', label: 'Random', icon: '🎲' },
];

export default function Navigation() {
    const location = useLocation();

    return (
        <>
            {/* Desktop Nav — floating pill at top */}
            <motion.nav
                className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center gap-1 px-2 py-2 bg-off-black/80 backdrop-blur-md border-2 border-off-white/10"
                style={{ clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink key={item.path} to={item.path}>
                            <motion.div
                                className={`px-4 py-2 text-sm font-body font-bold uppercase tracking-wider transition-all duration-100 flex items-center gap-2 ${isActive
                                        ? 'text-off-black bg-brat'
                                        : 'text-off-white/60 hover:text-off-white hover:bg-off-white/5'
                                    }`}
                                style={{
                                    clipPath: isActive
                                        ? 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
                                        : 'none',
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{item.icon}</span>
                                <span className="hidden lg:inline">{item.label}</span>
                            </motion.div>
                        </NavLink>
                    );
                })}
            </motion.nav>

            {/* Mobile Nav — bottom tab bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-off-black/95 backdrop-blur-md border-t-2 border-off-white/10 px-2 pb-[env(safe-area-inset-bottom)]">
                <div className="flex items-center justify-around py-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink key={item.path} to={item.path} className="flex flex-col items-center gap-0.5">
                                <motion.div
                                    className={`text-xl ${isActive ? 'drop-shadow-[0_0_8px_#8ACE00]' : ''}`}
                                    whileTap={{ scale: 1.3 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <span className={`text-[10px] font-body font-bold uppercase tracking-wider ${isActive ? 'text-brat' : 'text-off-white/40'
                                    }`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        className="w-1 h-1 bg-brat rounded-full"
                                        layoutId="activeTab"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
