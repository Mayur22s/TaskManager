import { combineReducers } from "redux";
import taskReducer from "./tasksReducer";

const appReducer = combineReducers({
    taskReducer,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer