import PropTypes from "prop-types";
import FormErrors from "../FormErrors";
const Input = ({
    placeholder,
    type = "text",
    additional = null,
    errors = null,
}) => {
    const styles =
        `w-full appearance-none bg-gray-200 ` +
        `border border-gray-200 focus:border-gray-100` +
        ` rounded-sm px-4 py-3 sm:mr-2 text-black placeholder-gray-500`;

    return (
        <>
            <input
                type={type}
                className={styles}
                placeholder={placeholder}
                aria-label={placeholder}
                {...additional}
            />
            <FormErrors errors={errors} />
        </>
    );
};

Input.propTypes = {
    additional: PropTypes.any,
    errors: PropTypes.array,
    placeholder: PropTypes.string,
    type: PropTypes.string
}
export default Input;
