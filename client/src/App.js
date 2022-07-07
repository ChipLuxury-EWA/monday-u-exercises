import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { TaskAppContainer } from "./components/TaskAppContainer/TaskAppContainer";
import { Header } from "./components/Header";

import {
    getItems,
    postItem,
    updateItem,
    deleteItem,
} from "./services/item_client";
import "./index.css";
import "monday-ui-react-core/dist/main.css";

function App() {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        getAllTasksFromDB();
    }, []);

    const getAllTasksFromDB = async () => {
        const ans = await getItems();
        setTasks(ans);
        return ans;
    };

    return (
        <Router>
            <Header />
            <div className="main">
                <TaskAppContainer
                    tasksFromDB={tasks}
                    addTask={postItem}
                    deleteTask={deleteItem}
                    updateItem={updateItem}
                    updateApp={getAllTasksFromDB}
                />
            </div>
        </Router>
    );
}

export default App;
