import React from "react";
import {TextField} from 'monday-ui-react-core'
import {Add} from 'monday-ui-react-core/dist/allIcons'
const UserInput = () => {
    return <div>
        <TextField
            autoFocus={true}
            clearOnIconClick={true}
            placeholder="Add new task"
            iconName={Add}
            size={TextField.sizes.LARGE}
            // loading={true}
            // onIconClick={() => console.log("fooo")}
        />
    </div>;
};

export default UserInput;
