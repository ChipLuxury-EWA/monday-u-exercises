import "./css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TaskAppContainer } from "./components/TaskAppContainer";
import Header from "./components/Header";
import About from "./components/About";

function App() {
    return (
        <div className="main">
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<TaskAppContainer />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
