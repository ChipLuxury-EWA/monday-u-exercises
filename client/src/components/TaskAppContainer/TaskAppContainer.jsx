import React from "react";
import PropTypes from "prop-types";
import "./tasksAppContainer.css";

import "monday-ui-react-core/dist/main.css";
import { Flex, EditableHeading } from "monday-ui-react-core";

import { UserInput } from "../UserInput/UserInput";
import { TaskList } from "../TasksList/TaskList";

import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, addTask, deleteTask, changeTask } from "../../redux/actions/task.actions";



export const TaskAppContainer = ({}) => {
    const dispatch = useDispatch();

    const taskList = useSelector((state) => state.taskList);
    const { loading, error, tasks } = taskList;

    React.useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    return (
        <Flex
            direction={Flex.directions.COLUMN}
            className={"task-app-container"}
        >
            <EditableHeading
                type="h1"
                value="Todo App - MondayU"
                placeholder={"Set tasks name"}
            />
            <UserInput />
            <TaskList
                tasksItems={tasks}
                loadingTasks={loading}
                deleteTask={dispatch(deleteTask)}
                updateItem={dispatch(changeTask)}
            />
        </Flex>
    );
};

TaskAppContainer.propTypes = {
    tasksFromDB: PropTypes.array,
    loadingTasks: PropTypes.bool,
};

TaskAppContainer.defaultProps = {
    loadingTasks: false,
};
