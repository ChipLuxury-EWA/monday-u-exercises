import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getItems,
    postItem,
    updateItem,
    deleteItem,
} from "../services/item_client";

export const getAllTasks = createAsyncThunk("tasks/getAll", async () => {
    return await getItems();
});

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (task, { dispatch }) => {
        await postItem(task);
        dispatch(getAllTasks());
        return;
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (task, { dispatch }) => {
        await deleteItem(task);
        dispatch(getAllTasks());
        return;
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (task, { dispatch }) => {
        console.log(task)
        await updateItem(task);
        dispatch(getAllTasks());
        return;
    }
);

// https://www.youtube.com/watch?v=xtD4YMKWI7w&ab_channel=Rowadz

export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        read: { list: [], status: null },
        create: { status: null, loading: null },
        delete: { status: null, loading: null },
        update: { status: null, loading: null },
    },
    extraReducers: {
        [getAllTasks.pending]: (state, action) => {
            state.read.loader = true;
            state.read.status = "loading";
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.read.loader = false;
            state.read.status = "success";
            state.read.list = action.payload;
        },
        [getAllTasks.rejected]: (state, action) => {
            state.read.loader = false;
            state.read.status = "failed";
        },

        [addTask.pending]: (state, action) => {
            state.create.loader = true;
            state.create.status = "loading";
        },
        [addTask.fulfilled]: (state, action) => {
            state.create.loader = false;
            state.create.status = "success";
        },
        [addTask.rejected]: (state, action) => {
            state.create.loader = false;
            state.create.status = "failed";
        },
        
        [deleteTask.pending]: (state, action) => {
            state.delete.loader = true;
            state.delete.status = "loading";
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.delete.loader = false;
            state.delete.status = "success";
        },
        [deleteTask.rejected]: (state, action) => {
            state.delete.loader = false;
            state.delete.status = "failed";
        },

        [updateTask.pending]: (state, action) => {
            state.update.loader = true;
            state.update.status = "loading";
        },
        [updateTask.fulfilled]: (state, action) => {
            state.update.loader = false;
            state.update.status = "success";
        },
        [updateTask.rejected]: (state, action) => {
            state.update.loader = false;
            state.update.status = "failed";
        },
    },
});

export default taskSlice.reducer;
