import { StyleSheet } from 'react-native'

const getStyle = (colors) => StyleSheet.create({
    card: {
        borderWidth: 1,
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    editButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    deleteButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
})
export default getStyle