export const Nav = ({ children }) => {
    return (
        <nav className="bg-gray-100 p-4">
            <ul className="flex space-x-2">{children}</ul>
        </nav>
    );
};
