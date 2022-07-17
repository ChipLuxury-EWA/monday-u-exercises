import React from "react";
import renderer from "react-test-renderer";
import About from "../About";

test("should render about component", () => {
    const about = renderer.create(<About />).toJSON();
    expect(about).toMatchSnapshot()
});
