import { call, put, select, takeLatest } from "redux-saga/effects";
import { syncTasksSuccess, syncTasksFailure } from "../actions/taskActions";
import { ActionConstants } from "../ActionConstants";

const API = "https://jsonplaceholder.typicode.com/todos?_limit=5"

function* syncTasksSaga() {
    try {
        // get local tasks
        const localTasks = yield select(state => state.taskReducer.taskList);

        // fetch new tasks from the mock API
        const response = yield call(fetch, API);
        const apiTasks = yield call([response, "json"]);

        const newApiTasks = apiTasks.map(task => ({
            ...task,
            id: `${task.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            description: `Fetched from API`,
        }));

        // append fetched tasks to local ones
        const mergedTasks = [...localTasks, ...newApiTasks];

        // save merged list to Redux (persisted to AsyncStorage automatically)
        yield put(syncTasksSuccess(mergedTasks));
    } catch (error) {
        yield put(syncTasksFailure(error.message));
    }
}

export default function* taskSaga() {
    yield takeLatest(ActionConstants.SYNC_TASKS_REQUEST, syncTasksSaga);
}

