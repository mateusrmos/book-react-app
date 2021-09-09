import React from "react";
import { render } from "@testing-library/react";
import Label from "../Label";
let container = null;
let labelText = "LabelText";
beforeEach(()=>{
    container = render(<Label>{labelText}</Label>);
})
describe("Controls", () => {
    describe("Test Controls", () => {
        it("should check if label is visible", () => {
            const { getByTestId } = container;
            expect(getByTestId("Label.element")).toBeVisible();
        });
        it("should check if label innertext is visible", () => {
            const { getByTestId } = container;
            expect(getByTestId("Label.element").innerHTML).toEqual(labelText);
        });
    });
});
