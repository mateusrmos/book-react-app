import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../Input";
describe("Controls", () => {
    describe("Test Controls", () => {
        it("should check if without errors shows empty", () => {
            let { queryByTestId } = render(<Input errors={null} />);
            expect(queryByTestId("FormErrors.component")).toBe(null);
        });
        it("should check if errors are visible", () => {
            const { getByTestId } = render(
                <Input errors={{ type: "required" }} />
            );
            expect(getByTestId("FormErrors.component")).toBeVisible();
        });
        it("should check if on change is being called", () => {
            let onChangeMock = jest.fn();
            let additional = { onChange: onChangeMock };
            let { getByTestId } = render(<Input additional={additional} />);
            fireEvent.change(getByTestId("Input.element"), {
                target: { value: "Hi" },
            });
            expect(onChangeMock).toBeCalledTimes(1);
        });
    });
});
