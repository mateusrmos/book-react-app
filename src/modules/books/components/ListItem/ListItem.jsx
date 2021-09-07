import PropTypes from "prop-types";
import Button from "../../../common/components/Button";
import { useModal } from "../../../common/components/Modal";
import { transformDateToText } from "../../../utils";
import BooksDeleteModal from "../BooksDeleteModal";
import BooksModal from "../BooksModal";

const ListItem = ({
    book,
    bookEditSuccess,
    bookEditError,
    bookEditLoading,
    onEditBook,
    onDeleteBook,
    bookDeleteSuccess,
    bookDeleteError,
    bookDeleteLoading,
    onFormClear,
    listBooks,
    authors,
}) => {
    const editAction = ({ bookInfo }) => {
        onEditBook({ bookId: book.id, bookInfo });
    };

    const [isShowingEditModal, toggleEditModal] = useModal();
    const [isShowingDeleteModal, toggleDeleteModal] = useModal();
    const booksModalProps = {
        isShowing: isShowingEditModal,
        toggle: toggleEditModal,
        onAction: editAction,
        listBooks: listBooks,
        bookActionSuccess: bookEditSuccess,
        bookActionError: bookEditError,
        bookActionLoading: bookEditLoading,
        onFormClear: onFormClear,
        type: `edit`,
        book: book,
        authors,
    };
    const booksDeleteProps = {
        isShowing: isShowingDeleteModal,
        toggle: toggleDeleteModal,
        onDelete: onDeleteBook,
        book,
        bookDeleteLoading,
        bookDeleteSuccess,
        bookDeleteError,
        onFormClear,
    };
    return (
        <li>
            <article className="p-4 flex space-x-4">
                <img
                    src="https://dummyimage.com/600x400/cc9af2/00ff80"
                    alt=""
                    className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
                    width="144"
                    height="144"
                />
                <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                    <h2 className="text-lg font-semibold text-black mb-0.5">
                        {book.title}
                    </h2>
                    <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                        <div className="flex-none w-full mt-0.5 font-normal">
                            <dt className="inline mr-1 text-gray-600">
                                Launch Date:
                            </dt>
                            <dd className="inline">
                                <abbr>
                                    {transformDateToText(book.launchDate)}
                                </abbr>
                            </dd>
                        </div>
                        <div className="flex-none w-full mt-0.5 font-normal">
                            <h2>Author</h2>
                            <dd className="block">
                                <div className="inline mr-1 text-gray-600">
                                    Name:
                                </div>
                                <abbr>{book.author.name}</abbr>
                            </dd>
                            <dd className="block">
                                <abbr>
                                    <div className="inline mr-1 text-gray-600">
                                        Date of birth:
                                    </div>
                                    {transformDateToText(book.author.birthdate)}
                                </abbr>
                            </dd>
                        </div>
                        <div className="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 sm:flex xl:flex items-center space-x-1">
                            <BooksModal {...booksModalProps} />
                            <BooksDeleteModal {...booksDeleteProps} />
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
    authors: PropTypes.any,
    book: PropTypes.shape({
        author: PropTypes.shape({
            birthdate: PropTypes.any,
            name: PropTypes.any
        }),
        id: PropTypes.any,
        launchDate: PropTypes.any,
        title: PropTypes.any
    }),
    bookDeleteError: PropTypes.any,
    bookDeleteLoading: PropTypes.any,
    bookDeleteSuccess: PropTypes.any,
    bookEditError: PropTypes.any,
    bookEditLoading: PropTypes.any,
    bookEditSuccess: PropTypes.any,
    listBooks: PropTypes.any,
    onDeleteBook: PropTypes.any,
    onEditBook: PropTypes.func,
    onFormClear: PropTypes.any
}
export default ListItem;
