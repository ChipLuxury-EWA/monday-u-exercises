import { TaskList } from "../TaskList";

export default {
    title: "TodoApp/TaskList",
    component: TaskList,
};

const Template = (args) => <TaskList {...args} />;

export const TasksExample = Template.bind({});
TasksExample.args = {
    tasksItems: [
        { title: "task 1" },
        { title: "task 2" },
        { title: "task 3", done: true },
        { title: "task 4", loading: true },
    ],
};

export const LoadingTasks = Template.bind({});
LoadingTasks.args = {
    loadingTasks: true,
    tasksItems: [{ title: "task loaded" }],
};
