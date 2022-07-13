import React from "react";
import PropTypes from "prop-types";
import "../css/taskItem.css";

import {
    Loader,
    EditableHeading,
    IconButton,
    Flex,
} from "monday-ui-react-core";
import { Check, Delete } from "monday-ui-react-core/dist/allIcons";
import "monday-ui-react-core/dist/main.css";

export const TaskItem = ({ onCheckClick, onDeleteClick, onChange, item }) => {
    const loaderIcon = item.loading ? <Loader size={Loader.sizes.SMALL} /> : "";
    const markAsDone = item.status ? "storybook-task-item--done" : "";

    return (
        <Flex
            className={["storybook-task-item", markAsDone].join(" ")}
            justify={Flex.justify.SPACE_BETWEEN}
            gap={Flex.gaps.NONE}
        >
            <Flex>
                <EditableHeading
                    type="h6"
                    size={EditableHeading.sizes.SMALL}
                    value={item.taskName}
                    onFinishEditing={(value) => {
                        onChange({ ...item, taskName: value });
                    }}
                />
                {loaderIcon}
            </Flex>
            <Flex>
                <IconButton
                    icon={Check}
                    onClick={() => {
                        onCheckClick({ ...item, status: !item.status });
                    }}
                />
                <IconButton icon={Delete} onClick={() => onDeleteClick(item)} />
            </Flex>
        </Flex>
    );
};

TaskItem.propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool,
    done: PropTypes.bool,
    onCheckClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onChange: PropTypes.func,
};

TaskItem.defaultProps = {
    value: "",
    loading: false,
    done: false,
    onCheckClick: () => console.log("onCheckFunc"),
    onDeleteClick: () => console.log("onDeleteFunc"),
    onChange: (value) => console.log(`changing task to ${value}`),
};
