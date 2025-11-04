import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
})

export const ThemeContextProvider = ({ children }: { children: any }) => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        // Load saved preference or system default
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('appTheme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                const systemTheme = Appearance.getColorScheme() || 'light';
                setTheme(systemTheme);
            }
        };
        loadTheme();

        // Optional: listen for system theme change
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme);
        });

        return () => listener.remove();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await AsyncStorage.setItem('appTheme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => useContext(ThemeContext);