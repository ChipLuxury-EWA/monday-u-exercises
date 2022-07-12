import React from "react";
import { TaskItem } from "./TaskItem";
import PropTypes from "prop-types";
import "../css/tasksList.css";

import "monday-ui-react-core/dist/main.css";
import { Loader } from "monday-ui-react-core";

export const TaskList = ({
    tasksItems,
    loadingTasks,
    deleteTask,
    updateItem,
}) => {
    const dynamicList = tasksItems.map((item) => {
        return (
            <TaskItem
                key={item.id}
                task={item.taskName}
                done={item.status}
                loading={item.loading}
                item={item}
                onCheckClick={updateItem}
                onDeleteClick={deleteTask}
                onChange={updateItem}
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
};

TaskList.defaultProps = {
    tasksItems: [],
    loadingTasks: false,
};
