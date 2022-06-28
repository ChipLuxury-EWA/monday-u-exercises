import React from "react";
import PropTypes from "prop-types";
import "./taskItem.css";

import {
    Loader,
    EditableHeading,
    IconButton,
    Flex,
} from "monday-ui-react-core";
import { Check, Delete } from "monday-ui-react-core/dist/allIcons";
import "monday-ui-react-core/dist/main.css";

export const TaskItem = ({
    value,
    loading,
    onCheckClick,
    onDeleteClick,
    onChange,
    className,
}) => {
    const loaderIcon = loading ? <Loader size={Loader.sizes.SMALL} /> : "";
    return (
        <Flex
            className={["storybook-task-item", ...className].join(" ")}
            justify={Flex.justify.SPACE_BETWEEN}
            gap={Flex.gaps.NONE}
        >
            <Flex>
                <EditableHeading
                    type="h6"
                    size="EditableHeading.sizes.SMALL"
                    value={value}
                    onFinishEditing={onChange}
                />
                {loaderIcon}
            </Flex>
            <Flex>
                <IconButton icon={Check} onClick={onCheckClick} />
                <IconButton icon={Delete} onClick={onDeleteClick} />
            </Flex>
        </Flex>
    );
};

TaskItem.propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool,
    onCheckClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    className: PropTypes.string,
};

TaskItem.defaultProps = {
    value: "",
    loading: false,
    onCheckClick: () => console.log("onCheckFunc"),
    onDeleteClick: () => console.log("onDeleteFunc"),
    onChange: (value) => console.log(`changing task to ${value}`),
    className: [],
};
