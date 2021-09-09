import React from "react";
import { render } from "@testing-library/react";
import FormErrors from "../FormErrors";
describe("Controls", () => {
    describe("Test Visibility", () => {
        it("should check if without errors shows empty", () => {
            let { queryByTestId } = render(<FormErrors errors={null} />);
            expect(queryByTestId("FormErrors.component")).toBe(null);
        });
        it("should check if errors are visible", () => {
            const { getByTestId } = render(
                <FormErrors errors={{ type: "required" }} />
            );
            expect(getByTestId("FormErrors.component")).toBeVisible();
        });
        it("should check if required error text is displayed", () => {
            let requiredMessage = "This field is required";
            let errors = { type: "required" };
            const { getByTestId } = render(<FormErrors errors={errors} />);
            let element = getByTestId("FormErrors.component");
            expect(element.innerHTML).toBe(requiredMessage);
        });
        it("should check if with generic error text is displayed", () => {
            let defaultMessage = "Please fill this field correctly";
            let errors = { type: "unknown" };
            const { getByTestId } = render(<FormErrors errors={errors} />);
            let element = getByTestId("FormErrors.component");
            expect(element.innerHTML).toBe(defaultMessage);
        });
    });
});
