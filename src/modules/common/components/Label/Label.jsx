import PropTypes from "prop-types";
const Label = ({ children, className = "" }) => {
    return (
        <label
            data-testid={"Label.element"}
            className={`text-gray-500 ${className}`}
        >
            {children}
        </label>
    );
};

Label.propTypes = {
    children: PropTypes.any,
    className: PropTypes.any,
};
export default Label;
