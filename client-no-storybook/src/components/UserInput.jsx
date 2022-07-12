import React from "react";
import PropTypes from "prop-types";
import "../css/userInput.css";

import { TextField } from "monday-ui-react-core";
import { Add } from "monday-ui-react-core/dist/allIcons";
import "monday-ui-react-core/dist/main.css";
import { addTask } from "../redux/task.slice";

export const UserInput = ({
    loading,
    onIconClick,
    value,
    onChange,
    updateApp,
}) => {
    const [task, setTask] = React.useState(value);
    return (
        <>
            <TextField
                placeholder={"Add a new task"}
                value={task}
                iconName={Add}
                loading={loading}
                onChange={(value) => {
                    setTask(value);
                    onChange(value);
                }}
                onIconClick={() => {
                    onIconClick(task);
                }}
                clearOnIconClick={true}
                size={TextField.sizes.LARGE}
                autoFocus={true}
                required={true}
            />
        </>
    );
};

UserInput.propTypes = {
    onIconClick: PropTypes.func,
    onChange: PropTypes.func,
    loading: PropTypes.bool,
};

UserInput.defaultProps = {
    onIconClick: (value) => console.log("Clicked on add icon", value),
    onChange: (value) => console.log(`Changed task to ${value}`),
    loading: false,
};
