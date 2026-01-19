import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const lightTheme = {
    background: '#F8FAFC',
    card: '#FFFFFF',
    border: '#E2E8F0',
    text: '#1E293B',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    gradient: ['#3B82F6', '#2563EB'],
    accent: '#14B8A6',
    primaryLight: '#EFF6FF',
    primaryBorder: '#BFDBFE',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
};

export const darkTheme = {
    background: '#0F172A',
    card: '#1E293B',
    border: '#334155',
    text: '#F1F5F9',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    gradient: ['#3B82F6', '#2563EB'],
    accent: '#14B8A6',
    primaryLight: '#1E3A5F',
    primaryBorder: '#3B5998',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
};

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemScheme === 'dark');

    const theme = isDark ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
