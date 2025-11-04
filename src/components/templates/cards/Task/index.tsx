import React, { FC } from 'react'
import { View } from 'react-native'
import Label from '../../../atoms/Label'
import { Button } from '../../../atoms'
import { useThemeColors } from '../../../../theme'
import getStyle from './styles'

interface TaskCardProps {
    item: any
    handleEdit: () => void
    handleDelete: () => void
}
const TaskCard: FC<TaskCardProps> = ({
    item,
    handleDelete,
    handleEdit
}) => {
    const colors = useThemeColors();
    const styles = getStyle(colors)
    return (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Label title={item?.title} style={[styles.title, { color: colors.text }]} />
            <Label title={item?.description} style={[styles.description, { color: colors.secondaryText }]} />

            <View style={styles.actionContainer}>
                <Button
                    buttonName="Edit"
                    onPress={handleEdit}
                    style={[styles.editButton, { backgroundColor: colors.edit }]}
                />
                <Button
                    buttonName="Delete"
                    onPress={handleDelete}
                    style={[styles.deleteButton, { backgroundColor: colors.delete }]}
                />
            </View>
        </View>
    )
}

export default TaskCard