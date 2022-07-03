import React from "react";
import { Tab, TabList, TabsContext } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";

export const Header = () => {
    return (
        <TabsContext >
            <TabList tabType="stretched">
                <Tab>First</Tab>
                <Tab>Second</Tab>
                <Tab>Third</Tab>
            </TabList>
        </TabsContext>
    );
};
