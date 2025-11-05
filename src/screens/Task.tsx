import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useMemo, useState } from 'react'
import { Alert, FlatList, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/atoms'
import Input from '../components/atoms/Input'
import Label from '../components/atoms/Label'
import TaskCard from '../components/templates/cards/Task'
import useDebounce from '../hooks/useDebounce'
import { stacks } from '../navigation/stack'
import { deleteTaskAction, resetNavigationFlagAction, syncTasksRequest } from '../redux/actions/taskActions'
import { useThemeColors } from '../theme'
import ListEmptyComponent from '../components/templates/ListEmpty'

type TaskListNavigationProps = NativeStackNavigationProp<
    stacks
    >

const Tasks = () => {
    const colors = useThemeColors();
    const styles = getStyle(colors)
    const navigation = useNavigation<TaskListNavigationProps>();
    const dispatch = useDispatch();
    const { taskList, syncStatus } = useSelector((state) => state?.taskReducer)
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
        dispatch(resetNavigationFlagAction())
        navigation.navigate('AddEditTask')
    }

    const handleEdit = (item) => {
        dispatch(resetNavigationFlagAction())
        navigation.navigate('AddEditTask', { selectedTask: item })
    }

    const handleDelete = (item) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
              text: 'OK',
              onPress: () => {
                  dispatch(deleteTaskAction(item))
              },
                },
            ]
        );
    };

    const renderItem = useCallback(({ item }) => {
        return <TaskCard item={item}
            handleDelete={() => handleDelete(item)}
            handleEdit={() => handleEdit(item)}
            key={item?.id}
        />
    }, [])

    const syncNow = () => dispatch(syncTasksRequest())

    const listEmpty = () => (
        <ListEmptyComponent />
    )

    return (
        <View style={styles.container}>
            <Label
                title="My Tasks"
                style={styles.label}
            />

            <Button
                buttonName={'Add Task'}
                onPress={handleAdd}
                style={{
                    backgroundColor: colors.add
                }}
                textStyle={styles.btnText}
            />

            <Input
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search tasks..."
            />


            <Button buttonName="Sync Now" onPress={syncNow} style={{
                }} />
            <Label title={`Sync Status: ${syncStatus}`} />


            <FlatList
                data={filteredTasks || []}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={listEmpty}
            />
        </View>
    )
}

const getStyle = (colors) => StyleSheet.create({
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    label: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: 0.5,
        paddingBottom: 10,
        paddingTop: 5
    },
    container: {
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingBottom: 20,
        flex: 1,
    },
    loader: {
        width: 26,
        height: 26,
        borderWidth: 3,
        borderRadius: 13,
        borderTopColor: 'transparent',
        marginLeft: '2%',
    },
})

export default Tasks