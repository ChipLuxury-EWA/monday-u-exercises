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



// https://www.youtube.com/watch?v=xtD4YMKWI7w&ab_channel=Rowadz

export const taskSlice = createSlice({
    name: "tasks",
    initialState: { list: [], status: null },
    extraReducers: {
        [getAllTasks.pending]: (state, action) => {
            state.loading = true;
            state.status = "loading";
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.loading = false;
            state.status = "success";
            state.list = action.payload;
        },
        [getAllTasks.rejected]: (state, action) => {
            state.loading = false;
            state.status = "failed";
        },
        
    },
});

export default taskSlice.reducer;
