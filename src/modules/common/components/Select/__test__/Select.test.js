import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "../Select";
let container = null;
let onChangeMock = null;
beforeEach(() => {
    let options = [
        { id: "First", text: "First" },
        { id: "Second", text: "Second" },
        { id: "Third", text: "Third" },
    ];
    onChangeMock = jest.fn();
    let additional = { onChange: onChangeMock };
    container = render(
        <Select
            options={options}
            errors={[{ type: "required" }]}
            additional={additional}
        />
    );
});
describe("Controls", () => {
    describe("Test Change", () => {
        it("should check if change is being called", () => {
            const { getByTestId } = container;
            fireEvent.change(getByTestId("Select.element"), {
                target: { value: "First" },
            });
            expect(onChangeMock).toBeCalledTimes(1);
        });
        it("should check if errors are displayed", () => {
            const { getByTestId } = container;
            const element = getByTestId("FormErrors.component");
            expect(element).toBeVisible();
        });
    });
});
