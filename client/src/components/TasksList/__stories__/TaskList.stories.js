import { TaskList } from "../TaskList";

export default {
    title: "Todo App/TaskList",
    component: TaskList,
};

const Template = (args) => <TaskList {...args} />;

export const TasksExample = Template.bind({});
TasksExample.args = {
    tasksItems: [
        { title: "task 1", id: 1342 },
        { title: "task 2", id: 23452 },
        { title: "task 3", done: true, id: 32345 },
        { title: "task 4", loading: true, id: 42345 },
    ],
};

export const LoadingTasks = Template.bind({});
LoadingTasks.args = {
    loadingTasks: true,
    tasksItems: [{ title: "task loaded" }],
};
