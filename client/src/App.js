import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {TaskAppContainer} from './components/TaskAppContainer/TaskAppContainer'
import "./index.css";
import "monday-ui-react-core/dist/main.css";

function App() {
    return <div className="main">
      <TaskAppContainer />
    </div>;
}

export default App;
