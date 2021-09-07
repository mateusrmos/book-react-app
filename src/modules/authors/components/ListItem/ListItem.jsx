import PropTypes from "prop-types";
import Button from "../../../common/components/Button";
import { useModal } from "../../../common/components/Modal";
import { transformDateToText } from "../../../utils";
import AuthorsDeleteModal from "../AuthorsDeleteModal";
import AuthorsModal from "../AuthorsModal";

const ListItem = ({
    author,
    authorEditSuccess,
    authorEditError,
    authorEditLoading,
    onEditAuthor,
    onDeleteAuthor,
    authorDeleteSuccess,
    authorDeleteError,
    authorDeleteLoading,
    onFormClear,
    listAuthors,
}) => {
    const editAction = ({ authorInfo }) => {
        onEditAuthor({ authorId: author.id, authorInfo });
    };

    const [isShowingEditModal, toggleEditModal] = useModal();
    const [isShowingDeleteModal, toggleDeleteModal] = useModal();

    const authorsEditModalProps = {
        isShowing: isShowingEditModal,
        toggle: toggleEditModal,
        onAction: editAction,
        listAuthors,
        authorActionSuccess: authorEditSuccess,
        authorActionError: authorEditError,
        authorActionLoading: authorEditLoading,
        onFormClear,
        type: `edit`,
        author,
    };

    const authorsDeleteModalProps = {
        isShowing: isShowingDeleteModal,
        toggle: toggleDeleteModal,
        onDelete: onDeleteAuthor,
        author,
        authorDeleteSuccess: authorDeleteSuccess,
        authorDeleteError: authorDeleteError,
        authorDeleteLoading: authorDeleteLoading,
        onFormClear,
    };

    return (
        <li>
            <article className="p-4 flex space-x-4">
                <img
                    src="https://dummyimage.com/600x400/039af2/00ff73"
                    alt=""
                    className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
                    width="144"
                    height="144"
                />
                <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                    <h2 className="text-lg font-semibold text-black mb-0.5">
                        {author.name}
                    </h2>
                    <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="flex-none w-full mt-0.5 font-normal">
                            <dt className="inline mr-1 text-gray-600">
                                Date of birth:
                            </dt>
                            <dd className="inline">
                                <abbr>
                                    {transformDateToText(author.birthdate)}
                                </abbr>
                            </dd>
                        </div>
                        <div className="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 sm:flex xl:flex items-center space-x-1">
                            <AuthorsModal {...authorsEditModalProps} />
                            <AuthorsDeleteModal {...authorsDeleteModalProps} />
                            <Button
                                className="border-2 border-gray-700 bg-yellow-500 hover:bg-yellow-700 text-white"
                                onClick={toggleEditModal}
                            >
                                Edit
                            </Button>
                            <Button
                                className="border-2 border-gray-700 bg-red-500 hover:bg-red-700 text-white"
                                onClick={toggleDeleteModal}
                            >
                                Delete
                            </Button>
                        </div>
                    </dl>
                </div>
            </article>
        </li>
    );
};

ListItem.propTypes = {
    author: PropTypes.shape({
        birthdate: PropTypes.any,
        id: PropTypes.any,
        name: PropTypes.any
    }),
    authorDeleteError: PropTypes.any,
    authorDeleteLoading: PropTypes.any,
    authorDeleteSuccess: PropTypes.any,
    authorEditError: PropTypes.any,
    authorEditLoading: PropTypes.any,
    authorEditSuccess: PropTypes.any,
    listAuthors: PropTypes.any,
    onDeleteAuthor: PropTypes.any,
    onEditAuthor: PropTypes.func,
    onFormClear: PropTypes.any
}
export default ListItem;
