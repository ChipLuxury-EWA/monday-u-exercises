import React from "react";
import { TaskItem } from "./TaskItem";
import PropTypes from "prop-types";
import "../css/tasksList.css";

import "monday-ui-react-core/dist/main.css";
import { Loader } from "monday-ui-react-core";

export const TaskList = ({
    tasksItems,
    loadingTasks,
    taskLoader,
    deleteTask,
    updateItem,
}) => {
    const dynamicList = tasksItems.map((item) => {
        return (
            <TaskItem
                key={item.id}
                loading={taskLoader}
                item={item}
                onCheckClick={updateItem}
                onChange={updateItem}
                onDeleteClick={deleteTask}
            />
        );
    });

    const element = loadingTasks ? (
        <Loader
            size={150}
            hasBackground
            className={"storybook-task-list-loader"}
        />
    ) : (
        <div className={"storybook-task-list-item"}>{dynamicList}</div>
    );

    return element;
};

TaskList.propTypes = {
    tasksItems: PropTypes.array,
    loadingTasks: PropTypes.bool,
    taskLoader: PropTypes.bool,
};

TaskList.defaultProps = {
    tasksItems: [],
    loadingTask: false,
    taskLoader: false,
};
