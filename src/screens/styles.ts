import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    addButton: {
        borderRadius: 24,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    addText: {
        fontSize: 24,
        color: '#fff',
        marginTop: -2,
    },
    empty: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 16,
    },
});
export default styles