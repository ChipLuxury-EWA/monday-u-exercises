import taskReducer, {
    initialState,
    addTask,
    updateTask,
    deleteTask,
    getAllTasks,
} from "../task.slice";
import * as itemModule from "../../services/item_client";

test("should return the initial state", () => {
    expect(taskReducer(undefined, { type: undefined })).toEqual(initialState);
});
// pending state checks:
test("should change addTask.pending state loading to true", () => {
    expect(taskReducer(initialState, addTask.pending())).toEqual({
        ...initialState,
        create: {
            loader: true,
            status: "loading",
        },
    });
});

test("should change updateTask.pending state loading to true", () => {
    expect(taskReducer(initialState, updateTask.pending())).toEqual({
        ...initialState,
        update: {
            loader: true,
            status: "loading",
        },
    });
});

test("should change deleteTask.pending state loading to true", () => {
    expect(taskReducer(initialState, deleteTask.pending())).toEqual({
        ...initialState,
        delete: {
            loader: true,
            status: "loading",
        },
    });
});

test("should change getAllTasks/pending state loading to true", () => {
    expect(taskReducer(initialState, getAllTasks.pending())).toEqual({
        ...initialState,
        read: {
            loader: true,
            status: "loading",
            list: [],
        },
    });
});
// fulfilled state checks:
test("should change addTask.fulfilled state status to success", () => {
    expect(taskReducer(initialState, addTask.fulfilled())).toEqual({
        ...initialState,
        create: {
            loader: false,
            status: "success",
        },
    });
});

test("should change updateTask.fulfilled state status to success", () => {
    expect(taskReducer(initialState, updateTask.fulfilled())).toEqual({
        ...initialState,
        update: {
            loader: false,
            status: "success",
        },
    });
});

test("should change deleteTask.fulfilled state status to success", () => {
    expect(taskReducer(initialState, deleteTask.fulfilled())).toEqual({
        ...initialState,
        delete: {
            loader: false,
            status: "success",
        },
    });
});

test("should change getAllTasks.fulfilled state status to success", () => {
    expect(taskReducer(initialState, getAllTasks.fulfilled())).toEqual({
        ...initialState,
        read: {
            loader: false,
            status: "success",
            // TODO: fix this bug learn how to return body from MSW:
            list: undefined,
        },
    });
});
// rejected state checks:
test("should change addTask.rejected state status to success", () => {
    expect(taskReducer(initialState, addTask.rejected())).toEqual({
        ...initialState,
        create: {
            loader: false,
            status: "failed",
        },
    });
});

test("should change updateTask.rejected state status to success", () => {
    expect(taskReducer(initialState, updateTask.rejected())).toEqual({
        ...initialState,
        update: {
            loader: false,
            status: "failed",
        },
    });
});

test("should change deleteTask.rejected state status to success", () => {
    expect(taskReducer(initialState, deleteTask.rejected())).toEqual({
        ...initialState,
        delete: {
            loader: false,
            status: "failed",
        },
    });
});

test("should change getAllTasks.rejected state status to success", () => {
    expect(taskReducer(initialState, getAllTasks.rejected())).toEqual({
        ...initialState,
        read: {
            loader: false,
            status: "failed",
            list: [],
        },
    });
});

// test("should send task to addItem service", async () => {
//     const postItemMethodFromItemClient = jest.spyOn(itemModule, "postItem");
//     taskReducer(initialState.read.list, addTask("test test test"));
//     expect(postItemMethodFromItemClient).toHaveBeenCalledTimes(1);
// });
