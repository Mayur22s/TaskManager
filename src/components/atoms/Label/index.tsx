import React, { FC } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useThemeColors } from '../../../theme';

interface LabelProps {
    title: string;
    style?: StyleProp<TextStyle>;
}

const Label: FC<LabelProps> = ({ title, style }) => {
    const colors = useThemeColors();

    return (
      <Text style={[styles.text, { color: colors.text }, style]}>
          {title}
      </Text>
    );
};

export default Label;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '400',
    },
});
