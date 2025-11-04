import React, { FC } from 'react'
import { View } from 'react-native'
import Label from '../../../atoms/Label'
import { Button } from '../../../atoms'

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
    return (
        <View style={{
            borderWidth: 1,
            padding: 10,
            marginVertical: 5,
            borderRadius: 8
        }}>
            <Label title={item?.title} />

            <Label title={item?.description} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    buttonName='Edit'
                    onPress={handleEdit}
                >

                </Button>
                <Label title={` | `} />
                <Button
                    buttonName='Delete'
                    onPress={handleDelete}
                ></Button>
            </View>

        </View>
    )
}

export default TaskCard