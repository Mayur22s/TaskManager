import { useColorScheme } from 'react-native';

export const useThemeColors = () => {
    const scheme = useColorScheme();

    const light = {
        background: '#FFFFFF',
        text: '#1A1A1A',
        secondaryText: '#666666',
        border: '#DDDDDD',
        primary: '#007AFF',
        card: '#F8F8F8',
        // button
        add: '#34C759',
        edit: '#007AFF',
        update: '#5856D6',
        delete: '#FF3B30',
    };

    const dark = {
        background: '#121212',
        text: '#FFFFFF',
        secondaryText: '#AAAAAA',
        border: '#333333',
        primary: '#0A84FF',
        card: '#1E1E1E',
        // button
        add: '#30D158',
        edit: '#0A84FF',
        update: '#5E5CE6',
        delete: '#FF453A',
    };

    return scheme === 'dark' ? dark : light;
};
