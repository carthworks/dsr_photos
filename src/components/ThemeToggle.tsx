import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sparkles, Layout } from 'lucide-react';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-xl flex flex-col gap-2">
                <button
                    onClick={() => setTheme('default')}
                    className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${theme === 'default'
                        ? 'bg-gold text-white shadow-lg'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                    title="Minimalist Theme"
                >
                    <Layout size={20} />
                    <span className="text-xs font-semibold pr-2 hidden lg:block">Minimalist</span>
                </button>

                <button
                    onClick={() => setTheme('glassmorphism')}
                    className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${theme === 'glassmorphism'
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                    title="Glassmorphism Theme"
                >
                    <Sparkles size={20} />
                    <span className="text-xs font-semibold pr-2 hidden lg:block">Glassmorphism</span>
                </button>

                <button
                    onClick={() => setTheme('claymorphism')}
                    className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${theme === 'claymorphism'
                        ? 'bg-rose-400 text-white shadow-lg shadow-rose-400/50 scale-105'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                    title="Claymorphism Theme"
                >
                    <Moon size={20} />
                    <span className="text-xs font-semibold pr-2 hidden lg:block">Claymorphism</span>
                </button>
            </div>
        </div>
    );
};

export default ThemeToggle;
