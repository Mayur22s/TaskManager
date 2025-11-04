import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../components/atoms/Input'
import { Button } from '../components/atoms'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskAction, editTaskAction, resetNavigationFlagAction } from '../redux/actions/taskActions'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { stacks } from '../navigation/stack'
import { useThemeColors } from '../theme'

type AddEditTaskRouteProp = RouteProp<stacks, 'AddEditTask'>;

const AddEditTask = () => {
    const colors = useThemeColors();

    const route = useRoute<AddEditTaskRouteProp>()
    const selectedTask = route.params?.selectedTask;

    const navigation = useNavigation();

    const dispatch = useDispatch()
    const taskInputFields = {
        title: '',
        description: '',
    }
    const [taskInput, setTaskInput] = useState(taskInputFields)
    const { isTaskUpdated, isTaskCreated } = useSelector((state: any) => state.taskReducer)

    useLayoutEffect(() => {
        const isEdit = !!route.params?.selectedTask?.id;
        navigation.setOptions({
            title: isEdit ? 'Edit Task' : 'Add Task',
        });
    }, [navigation, route.params])

    useEffect(() => {
        if (isTaskUpdated || isTaskCreated) {
            navigation.goBack();
            dispatch(resetNavigationFlagAction());
        }
    }, [isTaskUpdated, isTaskCreated])

    useEffect(() => {
        if (selectedTask?.id) {
            setTaskInput({
                title: selectedTask?.title || '',
                description: selectedTask?.description || '',
            })
        }
    }, [selectedTask?.id])

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
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            {/* Task title */}
            <Input
                value={taskInput.title}
                placeholder="Enter task title"
                onChangeText={(text: string) => handleChange('title', text)}
            />

            {/* Task description */}
            <Input
                value={taskInput.description}
                placeholder="Enter task description"
                onChangeText={(text: string) => handleChange('description', text)}
            />

            <Button
                buttonName={selectedTask?.id ? 'Update Task' : 'Save Task'}
                onPress={selectedTask?.id ? updateTask : handleSubmit}
                style={[
                    styles.button,
                    { backgroundColor: selectedTask?.id ? colors.update : colors.add },
                ]}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 10,
    },
});

export default AddEditTask