import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Flex, EditableHeading } from "monday-ui-react-core";

import "../css/tasksAppContainer.css";
import "monday-ui-react-core/dist/main.css";

import { UserInput } from "./UserInput";
import { TaskList } from "./TaskList";

import { getAllTasks } from "../redux/task.slice";

export const TaskAppContainer = ({}) => {
    const dispatch = useDispatch();
    const { list, loading, status } = useSelector((state) => state.tasks);

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
            <UserInput onIconClick={() => console.log("fii")} />
            <TaskList
                tasksItems={list}
                loadingTasks={loading}
                // deleteTask={deleteTask}
                // updateItem={updateItem}
            />

        </Flex>
    );
};

TaskAppContainer.propTypes = {};

TaskAppContainer.defaultProps = {};
