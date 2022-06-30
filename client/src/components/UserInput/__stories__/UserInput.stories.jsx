import React from "react";
import { UserInput } from "../UserInput";

export default {
    title: "Todo App/User Input",
    component: UserInput,
};

const Template = (args) => <UserInput {...args} />;

export const SimpleInput = Template.bind({});
SimpleInput.args = {};

export const onIconClick = Template.bind({});
onIconClick.args = {
    value: "Call onClick outside function when clicking the + icon --------->",
};

export const clearOnClick = Template.bind({});
clearOnClick.args = {
    value: "click on the plus icon clears me",
};

export const onChange = Template.bind({});
onChange.args = {
    value: "when changing this input, state:task is set and task is returned to outside function",
};

export const loading = Template.bind({});
loading.args = {
    value: "set loading: true adds loading icon ---->",
    loading: true
};
