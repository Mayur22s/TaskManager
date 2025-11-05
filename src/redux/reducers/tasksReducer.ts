import { InitialState, TaskAction } from "../../utils/interface/task"
import { ActionConstants } from "../ActionConstants"

const initialState: InitialState = {
    isLoading: false,
    taskList: [],
    isTaskUpdated: false,
    syncStatus: 'idle',
    isTaskCreated: false,
}
const taskReducer = (state = initialState, action: TaskAction) => {
    switch (action?.type) {

        case ActionConstants.ADD_TASK_SUCCESS:
            return {
                ...state,
                taskList: [...state.taskList, action?.payload],
                isTaskCreated: true,
            }


        case ActionConstants.EDIT_TASK_SUCCESS:
            if (action?.payload?.id) {

                const updatedTasks = state.taskList.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload }
                        : task
                )
                return {
                    ...state,
                    taskList: updatedTasks,
                    isTaskUpdated: true,
                }
            }

        case ActionConstants.DELETE_TASK_SUCCESS:

            const remainingTasks = state.taskList.filter(
                (task) => task.id !== action.payload?.id
            );

            return {
                ...state,
                taskList: remainingTasks
            }

        case ActionConstants.RESET_NAVIGATION:
            return {
                ...state,
                isTaskUpdated: false,
                isTaskCreated: false,
            }


        case ActionConstants.SYNC_TASKS_REQUEST:
            return { ...state, syncStatus: 'syncing' };

        case ActionConstants.SYNC_TASKS_SUCCESS:
            return { ...state, taskList: action.payload, syncStatus: 'success' };

        case ActionConstants.SYNC_TASKS_FAILURE:
            return { ...state, syncStatus: 'error' };

        default:
            return state


    }
}
export default taskReducer