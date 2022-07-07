import {
    TASK_LIST_REQUEST,
    TASK_LIST_FAILED,
    TASK_LIST_SUCCESS,
} from "../constants/tasks.constants";

export const taskListReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case TASK_LIST_REQUEST:
            return { loading: true, tasks: [] };
        case TASK_LIST_SUCCESS:
            return { loading: false, tasks: action.payload };
        case TASK_LIST_FAILED:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
