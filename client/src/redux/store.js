import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { taskListReducer } from "./reducers/task.reducer";

const reducer = { taskList: taskListReducer };

const store = configureStore({
    reducer,
    middleware: [thunkMiddleware],
    preloadedState: {},
});

export default store