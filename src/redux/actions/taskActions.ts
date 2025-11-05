import { TaskPayload } from "../../utils/interface/task";
import { ActionConstants } from "../ActionConstants";

export const addTaskAction = (payload: TaskPayload) => ({
    type: ActionConstants.ADD_TASK_SUCCESS,
    payload,
})

export const deleteTaskAction = (payload: TaskPayload) => ({
    type: ActionConstants.DELETE_TASK_SUCCESS,
    payload,
})

export const editTaskAction = (payload: TaskPayload) => ({
    type: ActionConstants.EDIT_TASK_SUCCESS,
    payload,
})

export const resetNavigationFlagAction = () => ({
    type: ActionConstants.RESET_NAVIGATION
})

export const syncTasksRequest = () => ({
    type: ActionConstants.SYNC_TASKS_REQUEST,
})
export const syncTasksSuccess = (tasks) => ({
    type: ActionConstants.SYNC_TASKS_SUCCESS,
    payload: tasks,
})
export const syncTasksFailure = (error) => ({
    type: ActionConstants.SYNC_TASKS_FAILURE,
    payload: error,
})