import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { TaskList } from "../TaskList";

import { Provider } from "react-redux";
import { store } from "../../redux/store";

const items = [
    {
        id: 56,
        taskName: "Take dog out for a walk",
        status: false,
    },
    {
        id: 32,
        taskName: "Do the dishes",
        status: true,
    },
];
const setup = () => {
    render(
        <Provider store={store}>
            <TaskList tasksItems={items} />
        </Provider>
    );
};

test("should render both items( one done one not)", () => {
    setup();
    const task1 = screen.getByRole("heading", { name: items[0].taskName });
    const task2 = screen.getByRole("heading", { name: items[1].taskName });
    
    const taskItem1 = task1.parentElement.parentElement.parentElement.parentElement;
    const taskItem2 = task2.parentElement.parentElement.parentElement.parentElement;
    
    expect(taskItem1.classList.contains("storybook-task-item--done")).toBe(false)
    expect(taskItem2.classList.contains("storybook-task-item--done")).toBe(true)
});
