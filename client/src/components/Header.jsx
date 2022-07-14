import React from "react";
import { useNavigate } from "react-router-dom";

import { TabList, Tab } from "monday-ui-react-core";

import "../css/header.css";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="tablist">
            <TabList tabType="stretched">
                <Tab onClick={() => navigate("/") } className="tab-item" >Tasks</Tab>
                <Tab onClick={() => navigate("/about")}>About</Tab>
            </TabList>
        </div>
    );
};

export default Header;
