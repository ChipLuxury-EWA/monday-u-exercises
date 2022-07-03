import React from "react";
import PropTypes from "prop-types";
import "./tasksAppContainer.css";

import "monday-ui-react-core/dist/main.css";
import { Flex, EditableHeading } from "monday-ui-react-core";

import { UserInput } from "../UserInput/UserInput";
import { TaskList } from "../TasksList/TaskList";

export const TaskAppContainer = ({
    tasksFromDB,
    loadingTasks,
    addTask,
    deleteTask,
    updateItem,
}) => {
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
            <UserInput onIconClick={addTask} />
            <TaskList
                tasksItems={tasksFromDB}
                loadingTasks={loadingTasks}
                deleteTask={deleteTask}
                updateItem={updateItem}
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
