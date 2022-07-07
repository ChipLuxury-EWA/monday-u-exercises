import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { TaskAppContainer } from "./components/TaskAppContainer/TaskAppContainer";
import { Header } from "./components/Header";

import {
    postItem,
    updateItem,
    deleteItem,
} from "./services/item_client";
import "./index.css";
import "monday-ui-react-core/dist/main.css";

function App() {

    return (
        <Router>
            <Header />
            <div className="main">
                <TaskAppContainer
                    addTask={postItem}
                    deleteTask={deleteItem}
                    updateItem={updateItem}
                />
            </div>
        </Router>
    );
}

export default App;
