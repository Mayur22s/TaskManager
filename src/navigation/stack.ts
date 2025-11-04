
export interface Task {
    id: string | number;
    title: string;
    description: string;
}

export type stacks = {
    Tasks: undefined;
    AddEditTask: { selectedTask?: Task } | undefined;
}