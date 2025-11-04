import React, { FC } from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { useThemeColors } from '../../../theme';

interface InputProps extends TextInputProps { }

const Input: FC<InputProps> = ({ value, placeholder, onChangeText, style, ...rest }) => {
    const colors = useThemeColors();

    return (
        <View
            style={[
                styles.container,
                { borderColor: colors.border, backgroundColor: colors.card },
            ]}
        >
            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.secondaryText}
                onChangeText={onChangeText}
                style={[styles.input, { color: colors.text }, style]}
                {...rest}
            />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    input: {
        fontSize: 16,
        fontWeight: '400',
    },
})