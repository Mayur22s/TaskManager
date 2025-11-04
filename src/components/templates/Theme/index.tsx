import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../../../services/themeManagement';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';
    const backgroundColor = isDark ? '#000' : '#fff';
    const textColor = isDark ? '#fff' : '#000';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={{ color: textColor }}>
                Current Theme: {theme.toUpperCase()}
            </Text>
            <Button
                title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                onPress={toggleTheme}
            />
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
