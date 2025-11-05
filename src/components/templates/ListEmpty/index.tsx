import React from 'react'
import { View, StyleSheet } from 'react-native'
import Label from '../../atoms/Label'
import { useThemeColors } from '../../../theme';

const ListEmptyComponent = () => {
    const colors = useThemeColors();

    return (
        <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
            <Label
                title={`Tap “Add Task” to create one.`}
                style={[styles.emptyText, { color: colors.secondaryText }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        padding: 20,
    },
    emptyText: {
        fontSize: 12,
        fontWeight: '400',
    },
});


export default ListEmptyComponent