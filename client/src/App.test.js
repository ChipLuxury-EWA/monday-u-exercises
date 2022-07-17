import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const TASK_FOR_TEST = "jest";
beforeEach(() => {

    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    // screen.debug()
});

afterEach(cleanup);


test("check app rendering by catching head title", () => {
    expect(screen.getByText(/Todo app/i)).toBeInTheDocument();
});

test('The selected tab should be "Tasks"', () => {
    const tasksTab = screen.getByRole("tab", { selected: true });
    expect(tasksTab).toHaveTextContent(/tasks/i);
});

test('The unselected tab should not be "Tasks" ', () => {
    const aboutTab = screen.getByRole("tab", { selected: false });
    expect(aboutTab).not.toHaveTextContent(/tasks/i);
});

test("the user can type task to input", () => {
    const input = screen.getByPlaceholderText(/Add a new task/i);
    userEvent.type(input, TASK_FOR_TEST);
    expect(input.value).toEqual(TASK_FOR_TEST);
    // expect(input.value).toEqual(TASK_FOR_TEST+"foo")
});

test('clicking on the "+" icon clears the input', () => {
    const input = screen.getByPlaceholderText(/Add a new task/i);
    userEvent.type(input, TASK_FOR_TEST);

    const addButton = document.querySelector(
        ".main > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > svg"
    );
    userEvent.click(addButton);
    expect(input.value).toEqual("");
    // expect(input.value).toEqual("foo")
});
