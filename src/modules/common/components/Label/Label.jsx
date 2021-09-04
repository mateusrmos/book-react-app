const Label = ({ children, className = "" }) => {
    return <label className={`text-gray-500 ${className}`}>{children}</label>;
};
export default Label;
