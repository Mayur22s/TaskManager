import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Input from '../components/atoms/Input'
import { Button } from '../components/atoms'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskAction, editTaskAction, resetNavigationFlagAction } from '../redux/actions/taskActions'
import { useNavigation } from '@react-navigation/native'

const AddEditTask = ({ route }) => {
    const { selectedTask } = route.params || {}; // <-- get passed task
    console.log('routes', route, selectedTask);
    const navigation = useNavigation();

    const dispatch = useDispatch()
    const taskInputFields = {
        title: '',
        description: '',
    }
    const [taskInput, setTaskInput] = useState(taskInputFields)
    const { isTaskUpdated, isTaskCreated } = useSelector((state: any) => state.taskReducer)

    useEffect(() => {
        if (selectedTask?.id) {
            setTaskInput({
                title: selectedTask?.title || '',
                description: selectedTask?.description || '',
            })
        }
    }, [selectedTask?.id])

    useEffect(() => {
        if (isTaskUpdated || isTaskCreated) {
            navigation.goBack();
            dispatch(resetNavigationFlagAction())
        }
    }, [isTaskUpdated, isTaskCreated])

    const handleChange = (key: string, value: string) => {
        setTaskInput({
            ...taskInput,
            [key]: value,
        })
    }

    const handleSubmit = () => {
        const payload = {
            title: taskInput.title.trim(),
            description: taskInput.description.trim(),
            id: Date.now(),
        }
        dispatch(addTaskAction(payload))
    }

    const updateTask = () => {
        const payload = {
            title: taskInput.title.trim(),
            description: taskInput.description.trim(),
            id: selectedTask?.id,
        }
        dispatch(editTaskAction(payload))
    }

    return (
        <View style={{
            paddingHorizontal: 20
        }}>
            {/* task title */}
            <Input
                value={taskInput.title}
                placeholder='Enter task title'
                onChangeText={(text: string) => handleChange('title', text)}
            />

            {/* task description */}
            <Input
                value={taskInput.description}
                placeholder='Enter task description'
                onChangeText={(text: string) => handleChange('description', text)}
            />

            <Button
                buttonName={selectedTask?.id ? 'Update Task' : 'Save Task'}
                onPress={selectedTask?.id ? updateTask : handleSubmit}
                style={{
                    backgroundColor: 'green',
                }}
            />
        </View>
    )
}

export default AddEditTask