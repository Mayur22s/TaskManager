import React, { useMemo, useState } from 'react'
import { Alert, FlatList, View, } from 'react-native'
import { Button } from '../components/atoms'
import Label from '../components/atoms/Label'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from '../components/templates/cards/Task'
import { deleteTaskAction, resetNavigationFlagAction, syncTasksRequest } from '../redux/actions/taskActions'
import Input from '../components/atoms/Input'
import useDebounce from '../hooks/useDebounce'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stacks } from '../navigation/stack'

type TaskListNavigationProps = NativeStackNavigationProp<
    stacks
>;

const Tasks = () => {
    const navigation = useNavigation<TaskListNavigationProps>();

    // const navigation = useNavigation();
    const dispatch = useDispatch();
    const taskList = useSelector((state: any) => state.taskReducer?.taskList);
    const syncStatus = useSelector((state: any) => state.taskReducer?.syncStatus);
    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useDebounce(searchText, 400);

    const filteredTasks = useMemo(() => {
        if (!debouncedSearch.trim()) return taskList
        const lowerSearch = debouncedSearch.toLowerCase()
        return taskList.filter(task =>
            task.title.toLowerCase().includes(lowerSearch) ||
            task.description.toLowerCase().includes(lowerSearch)
        )
    }, [debouncedSearch, taskList])

    const handleAdd = () => {
        console.log('55555 here');
        dispatch(resetNavigationFlagAction())
        navigation.navigate('AddEditTask')
    }

    const handleEdit = (item) => {
        dispatch(resetNavigationFlagAction())
        navigation.navigate('AddEditTask', { selectedTask: item })
    }

    const handleDelete = (item) => {
        Alert.alert(
            `Are you sure you want to delete this task?`,
            ``,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        console.log('OK Pressed', item)
                        dispatch(deleteTaskAction(item))
                    }
                },
            ]
        )
    }

    const renderItem = ({ item }) => {
        // console.log('77777 item', item);
        return <TaskCard item={item}
            handleDelete={() => handleDelete(item)}
            handleEdit={() => handleEdit(item)}
            key={item?.id}
        />
    }

    const syncNow = () => {
        dispatch(syncTasksRequest())
    }

    return (
        <View>
            <Label
                title='Task Manager'
            />
            <Button
                buttonName={'Add Task'}
                onPress={handleAdd}
                style={{
                    // backgroundColor: 'green'
                }}
            />

            <Input
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search tasks..."
                style={{}}
            />

            <View style={{ padding: 16 }}>
                <Button buttonName="Sync Now" onPress={syncNow} />
                <Label title={`Sync Status: ${syncStatus}`} />
            </View>

            <FlatList
                data={filteredTasks || []}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />


        </View>
    )
}

export default Tasks