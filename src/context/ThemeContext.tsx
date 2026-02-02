import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'default' | 'glassmorphism' | 'claymorphism';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeType>(() => {
        const saved = localStorage.getItem('app-theme');
        return (saved as ThemeType) || 'default';
    });

    const setTheme = (newTheme: ThemeType) => {
        setThemeState(newTheme);
        localStorage.setItem('app-theme', newTheme);
    };

    useEffect(() => {
        // Apply theme class to body
        const root = document.documentElement;
        root.classList.remove('theme-default', 'theme-glass', 'theme-clay');

        if (theme === 'glassmorphism') {
            root.classList.add('theme-glass');
        } else if (theme === 'claymorphism') {
            root.classList.add('theme-clay');
        } else {
            root.classList.add('theme-default');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
