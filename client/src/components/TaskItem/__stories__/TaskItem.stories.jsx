import React from "react";
import { TaskItem } from "../TaskItem";

export default {
    title: "Todo App/TaskItem",
    component: TaskItem,
};

const Template = (args) => <TaskItem {...args} />;

export const WithInput = Template.bind({});
WithInput.args = {
    task: "Buy a new gaming laptop"
};

export const ChangeInput = Template.bind({});
ChangeInput.args = {
    task: "change input text and press enter"
};

export const markDone = Template.bind({});
markDone.args = {
    task:"This task mark as done",
    done: true
};

export const Loading = Template.bind({});
Loading.args = {
    task: "Buy a new gaming laptop",
    loading: true
};

export const OnCheck = Template.bind({});
OnCheck.args = {
    task: "Click on check mark to call onCheck()",
};

export const OnDelete = Template.bind({});
OnDelete.args = {
    task: "Click on Delete icon to call onDelete()",
};
