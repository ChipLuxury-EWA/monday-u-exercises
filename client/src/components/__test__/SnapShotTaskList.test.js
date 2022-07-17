import React from "react";
import renderer from "react-test-renderer";
import { TaskList } from "../TaskList";

const tasks = [
    {
        id: 2,
        taskName: "test task",
        status: false,
    },
];

const multyTasks = [
    {
        id: 3,
        taskName: "test task 3",
        status: false,
    },
    {
        id: 4,
        taskName: "test task 4",
        status: false,
    },
    {
        id: 5,
        taskName: "test task 5",
        status: false,
    },
];

test("render with no todos", () => {
    const tree = renderer.create(<TaskList />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("render with one todo", () => {
    const tree = renderer.create(<TaskList tasksItems={tasks} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("render with 3 todos", () => {
    const tree = renderer.create(<TaskList tasksItems={multyTasks} />).toJSON();
    expect(tree).toMatchSnapshot();
});
test("render with loading", () => {
    const tree = renderer.create(<TaskList loading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});
