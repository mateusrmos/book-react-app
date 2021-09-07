import PropTypes from "prop-types";
import { getErrorMessage } from "../../../utils";
import _ from "lodash";

const FormErrors = ({ errors }) => {
    return !_.isEmpty(errors) ? (
        <span className="text-red-500">{getErrorMessage(errors)}</span>
    ) : null;
};

FormErrors.propTypes = {
    errors: PropTypes.array
}
export default FormErrors;
