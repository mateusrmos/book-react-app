import PropTypes from "prop-types";
import Button from "../../../common/components/Button";
import { useModal } from "../../../common/components/Modal";
import AuthorsModal from "../AuthorsModal";

const TopBar = ({
    onCreateAuthor,
    listAuthors,
    authorCreateSuccess,
    authorCreateError,
    authorCreateLoading,
    onFormClear,
}) => {
    const [isShowingCreateModal, toggleCreateModal] = useModal();

    const authorsCreateModalProps = {
        isShowing: isShowingCreateModal,
        toggle: toggleCreateModal,
        onAction: onCreateAuthor,
        listAuthors,
        authorActionSuccess: authorCreateSuccess,
        authorActionError: authorCreateError,
        authorActionLoading: authorCreateLoading,
        onFormClear,
    };
    return (
        <div className="p-4">
            <AuthorsModal {...authorsCreateModalProps} />
            <Button
                onClick={toggleCreateModal}
                className="border-2 border-gray-700 bg-green-500 hover:bg-green-700 text-white"
            >
                Create Author
            </Button>
        </div>
    );
};
export default TopBar;

TopBar.propTypes = {
    authorCreateError: PropTypes.any,
    authorCreateLoading: PropTypes.any,
    authorCreateSuccess: PropTypes.any,
    listAuthors: PropTypes.any,
    onCreateAuthor: PropTypes.any,
    onFormClear: PropTypes.any,
};
