import taskReducer, { initialState, addTask } from "../task.slice";
import * as itemModule from "../../services/item_client";

test("should return the initial state", () => {
    expect(taskReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should send task to addItem service", async () => {
    const postItemMethodFromItemClient = jest.spyOn(itemModule, "postItem");
    taskReducer(initialState.read.list, addTask("test test test"));
    expect(postItemMethodFromItemClient).toHaveBeenCalledTimes(1);
});
