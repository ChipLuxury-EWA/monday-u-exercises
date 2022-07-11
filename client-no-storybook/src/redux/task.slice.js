import { createSlice } from "@reduxjs/toolkit";
import {
    getItems,
    postItem,
    updateItem,
    deleteItem,
} from "../services/item_client";

export const taskSlice = createSlice({
    name: "taskSlice",
    initialState: { value: [] },
    reducers: {
        getAllTasks: async (state) => {
            state.value = await getItems();
        },
        addTask: async (state, action) => {
            postItem(action.payload);
            state.value = await getItems();
        },
        updateTask: async (state, action) => {
            updateItem(action.payload);
            state.value = await getItems();
        },
        deleteTask: async (state, action) => {
            deleteItem(action.payload);
            state.value = await getItems();
        },
    },
});

export const { getAllTasks, addTask, updateTask, deleteTask } =
    taskSlice.actions;
export default taskSlice.reducer;
