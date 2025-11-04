import { call, put, select, takeLatest } from "redux-saga/effects";
import { syncTasksSuccess, syncTasksFailure } from "../actions/taskActions";
import { ActionConstants } from "../ActionConstants";

function* syncTasksSaga() {
    try {
        // Get local tasks
        const localTasks = yield select(state => state.taskReducer.taskList);

        // Fetch new tasks from the mock API
        const response = yield call(fetch, "https://jsonplaceholder.typicode.com/todos?_limit=5");
        const apiTasks = yield call([response, "json"]);

        // Give each fetched task a random ID (to make them unique)
        const newApiTasks = apiTasks.map(task => ({
            ...task,
            id: `${task.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            description: `Fetched from API`,
        }));

        // Append fetched tasks to local ones (no filtering)
        const mergedTasks = [...localTasks, ...newApiTasks];

        // Save merged list to Redux (persisted to AsyncStorage automatically)
        yield put(syncTasksSuccess(mergedTasks));
    } catch (error) {
        yield put(syncTasksFailure(error.message));
    }
}

export default function* taskSaga() {
    yield takeLatest(ActionConstants.SYNC_TASKS_REQUEST, syncTasksSaga);
}

