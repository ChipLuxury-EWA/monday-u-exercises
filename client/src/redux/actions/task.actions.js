import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAILED,
} from "../constants/tasks.constants";

import { getItems } from "../../services/item_client";

export const listOfTasks = () => async (dispatch) => {
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
