import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAILED,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILED,
} from "../constants/tasks.constants";

import {
    getItems,
    postItem,
    updateItem,
    deleteItem,
} from "../../services/item_client";

export const getAllTasks = () => async (dispatch) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST });
        const tasks = await getItems();

        dispatch({ type: TASK_LIST_SUCCESS, payload: tasks });
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addTask = (taskTitle) => async (dispatch) => {
    console.log(taskTitle)
    try {
        dispatch({
            type: ADD_TASK_REQUEST,
        });

        await postItem(taskTitle);

        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: taskTitle
        });
    } catch (error) {
        dispatch({
            type: ADD_TASK_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const changeTask = (taskTitle) => async (dispatch) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST });
        const tasks = await getItems();

        dispatch({ type: TASK_LIST_SUCCESS, payload: tasks });
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteTask = () => {};
