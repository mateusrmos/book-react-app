import PropTypes from "prop-types";
import ListItem from "../ListItem";

const List = (props) => {
    const { booksList } = props;
    return (
        <ul className="divide-y divide-gray-100">
            {booksList.length > 0 &&
                booksList.map((book) => (
                    <ListItem key={book.id} book={book} {...props} />
                ))}
        </ul>
    );
};

List.propTypes = {
    booksList: PropTypes.any
}
export default List;
