import React from "react";
import { TextField, IconButton, Flex } from "monday-ui-react-core";
import { Check, Delete } from "monday-ui-react-core/dist/allIcons";

const TaskItem = () => {
    return (
        <div>
            <Flex>
                <TextField
                    readonly={true}
                    value={"get input from props"}
                    iconsNames={{ layout: Flex ,primary: Check, secondary: Delete, label: 'sdf' }}
                    // loading={true}
                    // onIconClick={() => console.log("fooo")}
                />
                <IconButton icon={Check} />
                <IconButton icon={Delete} />
            </Flex>
        </div>
    );
};

export default TaskItem;
