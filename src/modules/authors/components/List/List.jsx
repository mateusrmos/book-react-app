import PropTypes from "prop-types";
import ListItem from "../ListItem";

const List = (props) => {
    const { authorsList } = props;
    return (
        <ul className="divide-y divide-gray-100">
            {authorsList.length > 0 &&
                authorsList.map((author) => (
                    <ListItem key={author.id} author={author} {...props} />
                ))}
        </ul>
    );
};

List.propTypes = {
    authorsList: PropTypes.any
}
export default List;
