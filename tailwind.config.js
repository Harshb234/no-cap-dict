/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brat': '#8ACE00',
                'hot-pink': '#FF2D78',
                'e-purple': '#BF00FF',
                'cyber-yellow': '#FFE600',
                'off-black': '#0A0A0A',
                'off-white': '#F0F0F0',
            },
            fontFamily: {
                'display': ['"Bebas Neue"', 'sans-serif'],
                'body': ['"Space Grotesk"', 'sans-serif'],
                'accent': ['"Permanent Marker"', 'cursive'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'float-slow': 'float 5s ease-in-out infinite',
                'glitch': 'glitch 0.3s ease-in-out',
                'grain': 'grain 0.5s steps(10) infinite',
                'bounce-slow': 'bounce 2s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
                'slide-in': 'slideIn 0.5s ease-out',
                'shake': 'shake 0.5s ease-in-out',
                'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(2deg)' },
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-3px, 3px)' },
                    '40%': { transform: 'translate(-3px, -3px)' },
                    '60%': { transform: 'translate(3px, 3px)' },
                    '80%': { transform: 'translate(3px, -3px)' },
                    '100%': { transform: 'translate(0)' },
                },
                grain: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '10%': { transform: 'translate(-5%, -10%)' },
                    '30%': { transform: 'translate(3%, -15%)' },
                    '50%': { transform: 'translate(12%, 9%)' },
                    '70%': { transform: 'translate(9%, 4%)' },
                    '90%': { transform: 'translate(-1%, 7%)' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
                },
                pulseNeon: {
                    '0%, 100%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
                    '50%': { boxShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
                },
            },
        },
    },
    plugins: [],
}
