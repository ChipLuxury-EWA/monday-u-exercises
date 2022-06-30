import React from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import PropTypes from "prop-types";
import "./tasksList.css";

import "monday-ui-react-core/dist/main.css";
import { Loader } from "monday-ui-react-core";

export const TaskList = ({ tasksItems, loadingTasks }) => {
    const dynamicList = tasksItems.map((item) => {
        return (
            <TaskItem
                key={item.id}
                task={item.title}
                done={item.done}
                loading={item.loading}
            />
        );
    });

    const element = loadingTasks ? (
        <Loader size={150} hasBackground className={"storybook-task-list-loader"} />
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
