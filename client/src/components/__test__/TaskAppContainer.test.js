import * as itemModule from "../../services/item_client";
// https://www.chakshunyu.com/blog/how-to-spy-on-a-named-import-in-jest/

import {
    render,
    screen,
    cleanup,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { TaskAppContainer } from "../TaskAppContainer";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const items = [
    {
        id: 56,
        taskName: "Take dog out for a walk",
        status: true,
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
            <TaskAppContainer />
        </Provider>
    );
};

afterEach(cleanup);

it("should display loader", () => {
    setup();
    expect(screen.getByRole("alert", { name: /loading/i })).toBeVisible();
    // screen.debug()
});

test("should render 2 tasks", async () => {
    jest.spyOn(itemModule, "getItems").mockReturnValue(items);
    setup();
    // await screen.findByText(/do the dishes/i);
    await screen.findByRole('heading', {  name: items[0].taskName})
    await screen.findByRole('heading', {  name: items[1].taskName})
    // screen.debug()

});
