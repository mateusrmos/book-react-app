import _ from "lodash";
import FormErrors from "../FormErrors";

const Select = ({ options, additional = null, errors = null }) => {
    const styles =
        `w-full appearance-none bg-gray-200 ` +
        `border border-gray-200 focus:border-gray-100` +
        ` rounded-sm px-4 py-3 sm:mr-2 text-black placeholder-gray-500`;
    const hasOptions = !_.isEmpty(options) && options.length > 0;
    return (
        <>
            <select className={styles} {...additional}>
                <option value="">Selecione</option>
                {hasOptions &&
                    options.map((eachOption) => (
                        <option key={eachOption.id} value={eachOption.id}>
                            {eachOption.text}
                        </option>
                    ))}
            </select>
            <FormErrors errors={errors} />
        </>
    );
};

export default Select;
