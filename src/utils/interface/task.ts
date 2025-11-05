export interface TaskAction {
    type: string
    payload: TaskPayload
}
export interface TasksData {
    title: string
    description: string
    id: string
}
export interface InitialState {
    isLoading: boolean,
    taskList: TasksData[]
    isTaskUpdated: boolean
    syncStatus: string
    isTaskCreated: boolean
}
export interface TaskPayload {
    title: string
    description: string
    id: string | number
}
