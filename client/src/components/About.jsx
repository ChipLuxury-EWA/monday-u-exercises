import React from "react";
import {
    Heading,
    Accordion,
    AccordionItem,
    Checkbox
} from "monday-ui-react-core";
import '../css/about.css'

const About = () => {
    return (
        <div>
            <Heading value="About the app" />
            <p>
                This todo app is a part of{" "}
                <a
                    href="https://monday-u.com/program/rd/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    monday U
                </a>{" "}
                Full-Stack Development Program. 
                <p>
                    To use this app you click on the 'Tasks' tab. <br/>
                    You can enter a new task by typing it and press the '+', if you want to catch pokemon just enter a number.<br/>
                    Click on the 'V' mark the task as done.<br/>
                    Click on the trash icon delete the task.
                </p>
            </p>
            <p>
                I used to following stack:
                <Accordion >
                    <AccordionItem title="React">
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="6 components: Header, About, UserInput, TaskAppContainer, TaskList, TaskItem."
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Developing components with storybook."
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Using components from 'Vibe Design System' by monday.com ."
                        />
                    </AccordionItem>
                    <AccordionItem title="Redux">
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Redux toolkit"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="using 'configureStore' and slice methods"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Async thunks (createAsyncThunk method)"
                        />
                    </AccordionItem>
                    <AccordionItem title="Express">
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Express server"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="CRUD routes"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Serving static files"
                        />
                    </AccordionItem>
                    <AccordionItem title="Data Base">
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="mySql"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="sequelize ORM"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Migrations and seeders"
                        />
                    </AccordionItem>
                    <AccordionItem title="Testing">
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Jest"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Redux testing"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="Server and routes mocking"
                        />
                        <Checkbox
                        className="checkbox-fix"
                            checked={true}
                            label="80% coverage"
                        />
                    </AccordionItem>
                </Accordion>
            </p>
        </div>
    );
};

export default About;
