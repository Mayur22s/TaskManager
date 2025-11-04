import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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

type TaskListNavigationProps = NativeStackNavigationProp<
    stacks
    >

const Tasks = () => {
    const colors = useThemeColors();
    const styles = getStyle(colors)
    const navigation = useNavigation<TaskListNavigationProps>();
    const dispatch = useDispatch();
    const taskList = useSelector((state: any) => state.taskReducer?.taskList);
    const syncStatus = useSelector((state: any) => state.taskReducer?.syncStatus);
    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useDebounce(searchText, 400);
    const isMounted = useRef(true);

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
                  if (isMounted.current) {
                      dispatch(deleteTaskAction(item));
                  }
              },
                },
            ]
        );
    };

    const renderItem = ({ item }) => {
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
        <View style={{
            backgroundColor: colors.background
        }}>
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

    },

})

export default Tasks