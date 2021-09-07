import PropTypes from "prop-types";
import FormErrors from "../FormErrors";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DatePicker = ({ control, Controller, rules, name, errors }) => {
    const datePickerStyles =
        `w-full appearance-none bg-gray-200 ` +
        `border border-gray-200 focus:border-gray-100` +
        ` rounded-sm px-4 py-3 sm:mr-2 text-black placeholder-gray-500`;
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => (
                    <ReactDatePicker
                        dateFormat="yyyy/MM/dd"
                        className={datePickerStyles}
                        placeholderText="Select date"
                        onChange={(date) => {
                            field.onChange(date);
                        }}
                        selected={field.value}
                    />
                )}
            />
            <FormErrors errors={errors} />
        </>
    );
};

DatePicker.propTypes = {
    Controller: PropTypes.any,
    control: PropTypes.any,
    errors: PropTypes.any,
    name: PropTypes.any,
    rules: PropTypes.any
}
export default DatePicker;
