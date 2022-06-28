import React from "react";
import Header from "./Header";
import TaskListContainer from "./TaskListContainer";
import UserInput from "./UserInput";

const AppContainer = () => {
    return <div>
        <Header />
        <UserInput />
        <TaskListContainer />
    </div>;
};

export default AppContainer;