import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { taskListReducer,addTaskReducer } from "./reducers/task.reducer";

const reducer = { taskList: taskListReducer, addTask: addTaskReducer };

const store = configureStore({
    reducer,
    middleware: [thunkMiddleware],
    preloadedState: {},
});

export default store