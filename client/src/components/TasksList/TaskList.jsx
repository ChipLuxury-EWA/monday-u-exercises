import React from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import PropTypes from "prop-types";

import "monday-ui-react-core/dist/main.css";
import { Divider, Loader } from "monday-ui-react-core";

export const TaskList = ({ tasksItems, loadingTasks }) => {
    const dynamicList = tasksItems.map((item) => {
        return (
            <div key={item.id}>
                <TaskItem
                    task={item.title}
                    done={item.done}
                    loading={item.loading}
                />
                <Divider />
            </div>
        );
    });

    return (
        <>{loadingTasks ? <Loader size={150} hasBackground /> : dynamicList}</>
    );
};

TaskList.propTypes = {
    tasksItems: PropTypes.array,
    loadingTasks: PropTypes.bool,
};

TaskList.defaultProps = {
    tasksItems: [],
    loadingTasks: false,
};
