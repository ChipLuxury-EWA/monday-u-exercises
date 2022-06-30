import React from "react";

import { TaskAppContainer } from "../TaskAppContainer";

export default {
    title: "Todo App/Main page",
    component: TaskAppContainer,
};

const Template = (args) => <TaskAppContainer {...args} />;

export const startingPage = Template.bind({});
startingPage.args = {};

export const withTasks = Template.bind({});
withTasks.args = {
    tasksFromDB: [
        { title: "task 1", id: 1 },
        { title: "task 2", id: 2 },
        { title: "task 3", done: true, id: 3 },
        { title: "task 4", loading: true, id: 4 },
        { title: "task 5", id: 5 },
        { title: "task 6", id: 6 },
        { title: "task 7", done: true, id: 7 },
        { title: "task 8", loading: true, id: 8 },
        { title: "task 9", id: 9 },
        { title: "task 10", id: 10 },
        { title: "task 11", done: true, id: 11 },
        { title: "task 12", loading: true, id: 12 },
    ],
};

export const loadingTasks = Template.bind({});
loadingTasks.args = {
    loadingTasks: true
};