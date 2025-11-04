import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useThemeColors } from '../../../theme';
import Label from '../Label';

interface ButtonProps extends TouchableOpacityProps {
    buttonName: string;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
}

const Button: FC<ButtonProps> = ({ buttonName, onPress, style, textStyle }) => {
    const colors = useThemeColors();

    return (
        <TouchableOpacity
            onPress={onPress}
          style={[styles.button, { backgroundColor: colors.primary }, style]}
      >
          <Label title={buttonName} style={[styles.text, textStyle]} />
      </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
});