import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

let container = null;
let initialText = "Button Content";
let onClickMock = null;
beforeEach(() => {
    onClickMock = jest.fn();
    container = render(
        <Button onClick={() => onClickMock()}>{initialText}</Button>
    );
});
describe("Controls", () => {
    describe("Test Click", () => {
        it("should check if clicking works", () => {
            const { getByTestId } = container;
            const buttonElement = getByTestId("Button.element");
            fireEvent.click(buttonElement);
            expect(onClickMock).toBeCalledTimes(1);
        });
        it("should check inner text is equals to expected", () => {
            const { getByTestId } = container;
            const buttonElement = getByTestId("Button.element");
            expect(buttonElement.innerHTML).toEqual(initialText);
        });
    });
});
