import React from "react";
import { TaskItem } from "../TaskItem";

export default {
    title: "TodoApp/TaskItem",
    component: TaskItem,
    argTypes: {
        backgroundColor: { control: "color" },
    },
};

const Template = (args) => <TaskItem {...args} />;

export const WithInput = Template.bind({});
WithInput.args = {
    value: "Buy a new gaming laptop"
};

export const ChangeInput = Template.bind({});
ChangeInput.args = {
    value: "change input text and press enter"
};

export const Loading = Template.bind({});
Loading.args = {
    value: "Buy a new gaming laptop",
    loading: true
};

export const OnCheck = Template.bind({});
OnCheck.args = {
    value: "Click on check mark to call onCheck()",
};

export const OnDelete = Template.bind({});
OnDelete.args = {
    value: "Click on Delete icon to call onDelete()",
};
