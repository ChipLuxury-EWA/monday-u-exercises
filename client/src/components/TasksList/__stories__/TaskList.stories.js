import { TaskList } from "../TaskList";

export default {
    title: "TodoApp/TaskList",
    component: TaskList,
    argTypes: {
        backgroundColor: { control: "color" },
    },
};

const Default = (args) => <TaskList />;


