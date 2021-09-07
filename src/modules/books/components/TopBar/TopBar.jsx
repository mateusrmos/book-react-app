import PropTypes from "prop-types";
import Button from "../../../common/components/Button";
import { useModal } from "../../../common/components/Modal";
import BooksModal from "../BooksModal";

const TopBar = ({
    onCreateBook,
    listBooks,
    bookCreateSuccess,
    bookCreateError,
    bookCreateLoading,
    onFormClear,
    authors,
}) => {
    const [isShowingCreateModal, toggleCreateModal] = useModal();
    const booksModalProps = {
        isShowing: isShowingCreateModal,
        toggle: toggleCreateModal,
        onAction: onCreateBook,
        listBooks,
        bookActionSuccess: bookCreateSuccess,
        bookActionError: bookCreateError,
        bookActionLoading: bookCreateLoading,
        onFormClear,
        authors,
    };
    return (
        <div className="p-4">
            <BooksModal {...booksModalProps} />
            <Button
                onClick={toggleCreateModal}
                className="border-2 border-gray-700 bg-green-500 hover:bg-green-700 text-white"
            >
                Create Book
            </Button>
        </div>
    );
};

TopBar.propTypes = {
    authors: PropTypes.any,
    bookCreateError: PropTypes.any,
    bookCreateLoading: PropTypes.any,
    bookCreateSuccess: PropTypes.any,
    listBooks: PropTypes.any,
    onCreateBook: PropTypes.any,
    onFormClear: PropTypes.any
}
export default TopBar;
