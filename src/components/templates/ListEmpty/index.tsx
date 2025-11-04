import React from 'react'
import { View, StyleSheet } from 'react-native'
import Label from '../../atoms/Label'
import { useThemeColors } from '../../../theme';

const ListEmptyComponent = () => {
    const colors = useThemeColors();

    return (
        <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
            <Label
                title=""
                style={[styles.emptyText, { color: colors.secondaryText }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '400',
    },
});


export default ListEmptyComponent