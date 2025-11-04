// src/theme.ts
import { useColorScheme } from 'react-native';

export const useThemeColors = () => {
    const scheme = useColorScheme();

    const light = {
        // Base colors
        background: '#FFFFFF',
        text: '#1A1A1A',
        secondaryText: '#666666',
        border: '#DDDDDD',

        // Primary theme colors
        primary: '#007AFF', // Default blue
        card: '#F8F8F8',

        // Button action colors
        add: '#34C759',     // Green - Add task
        edit: '#007AFF',    // Blue - Edit task
        update: '#5856D6',  // Indigo - Update task
        delete: '#FF3B30',  // Red - Delete task
    };

    const dark = {
        // Base colors
        background: '#121212',
        text: '#FFFFFF',
        secondaryText: '#AAAAAA',
        border: '#333333',

        // Primary theme colors
        primary: '#0A84FF',
        card: '#1E1E1E',

        // Button action colors (dark variants)
        add: '#30D158',     // Green
        edit: '#0A84FF',    // Blue
        update: '#5E5CE6',  // Indigo
        delete: '#FF453A',  // Red
    };

    return scheme === 'dark' ? dark : light;
};
