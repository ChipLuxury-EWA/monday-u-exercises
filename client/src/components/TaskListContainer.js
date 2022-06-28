import React from "react";
import TaskItem from "./TaskItem";
import { Heading } from "monday-ui-react-core";

const TaskListContainer = () => {
    return <div>
        <Heading value="Tasks:" size={Heading.sizes.SMALL} />
        <TaskItem />
    </div>;
};

export default TaskListContainer;
