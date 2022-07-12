import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task.slice";

export const store = configureStore({
    reducer: { tasks: taskReducer },
});
