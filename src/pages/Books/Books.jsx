import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Books.module.scss";
import stylesModal from "../../modules/common/components/Modal/Modal.module.scss";
import { actions as booksActions } from "../../state/books";
import { actions as authorsActions } from "../../state/authors";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    useModal,
} from "../../modules/common/components/Modal";
import Button from "../../modules/common/components/Button";
import moment from "moment";
import Label from "../../modules/common/components/Label";
import Input from "../../modules/common/components/Input";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import FormErrors from "../../modules/common/components/FormErrors";
import Loading from "../../modules/common/components/Loading";
import { transformDateToText } from "../../modules/utils";
import Select from "../../modules/common/components/Select";

const BooksModal = ({
    isShowing,
    toggle,
    onAction,
    listBooks,
    bookActionSuccess,
    bookActionError,
    bookActionLoading,
    type = "create",
    onFormClear,
    book = null,
    authors,
}) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const onSubmit = (formData) => {
        onAction({ bookInfo: formData });
    };

    useEffect(() => {
        if (bookActionSuccess && isShowing) {
            if (type === "create") {
                listBooks();
            }
            toggle();
        }
    }, [bookActionSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (type === "edit" && isShowing) {
            setValue("title", book.title);
            setValue("launchDate", moment(book.launchDate).toDate());
            setValue("author", book.author.id);
        }
        if (!isShowing) {
            setValue("title", "");
            setValue("launchDate", "");
            setValue("author", "");
            onFormClear();
            clearErrors();
        }
    }, [isShowing]); // eslint-disable-line react-hooks/exhaustive-deps

    const createButtonStyle = classNames(`text-white bg-green-500`, {
        [`hover:bg-green-700`]: !bookActionLoading,
    });
    let title = `Create Book`;
    let errorMessage = `Error while creating.`;
    let buttonText = `Create`;
    if (type === "edit") {
        title = `Edit Book`;
        errorMessage = `Error while editing.`;
        buttonText = `Edit`;
    }

    const datePickerStyles =
        `w-full appearance-none bg-gray-200 ` +
        `border border-gray-200 focus:border-gray-100` +
        ` rounded-sm px-4 py-3 sm:mr-2 text-black placeholder-gray-500`;

    return (
        <Modal
            isShowing={isShowing}
            toggle={toggle}
            modalClassName={styles.modal}
        >
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <ModalHeader>
                    <>
                        <div>{title}</div>
                        <span
                            className={`text-right ${stylesModal.modalButtonClose}`}
                            onClick={toggle}
                        >
                            &#10006;
                        </span>
                    </>
                </ModalHeader>
                <ModalBody>
                    <div>
                        {bookActionError && (
                            <div className="text-white bg-red-400 pl-3 pr-3 pt-3 rounded pb-3">
                                {errorMessage}
                            </div>
                        )}
                        <div className={`mb-2`}>
                            <Label>Title</Label>
                            <Input
                                placeholder="Title"
                                additional={register(`title`, {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 255,
                                })}
                                errors={errors?.title}
                            />
                        </div>
                        <div className={`mb-2`}>
                            <Label>Launch Date</Label>
                            <Controller
                                control={control}
                                name={`launchDate`}
                                rules={{
                                    required: true,
                                    pattern:
                                        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                }}
                                render={({ field }) => (
                                    <DatePicker
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
                            <FormErrors errors={errors?.launchDate} />
                        </div>
                        <div className={`m-b-2`}>
                            <Label>Author</Label>
                            <Select
                                options={authors}
                                additional={register(`author`, {
                                    required: true,
                                })}
                                errors={errors?.author}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="text-right">
                        <Button
                            className={createButtonStyle}
                            isLoading={bookActionLoading}
                            disabled={bookActionLoading}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    );
};

const BooksDeleteModal = ({
    isShowing,
    toggle,
    onDelete,
    book,
    bookDeleteLoading,
    bookDeleteSuccess,
    bookDeleteError,
    onFormClear,
}) => {
    const deleteButtonStyle = classNames(`text-white bg-red-500`, {
        [`hover:bg-red-700`]: !bookDeleteLoading,
    });

    useEffect(() => {
        if (isShowing && bookDeleteSuccess) {
            toggle();
        }
    }, [bookDeleteSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!isShowing) {
            onFormClear();
        }
    }, [isShowing]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Modal
            isShowing={isShowing}
            toggle={toggle}
            modalClassName={styles.modal}
        >
            <form method="POST">
                <ModalHeader>
                    <>
                        <div>Delete Book</div>
                        <span
                            className={`text-right ${stylesModal.modalButtonClose}`}
                            onClick={toggle}
                        >
                            &#10006;
                        </span>
                    </>
                </ModalHeader>
                <ModalBody>
                    <div>
                        {bookDeleteError && (
                            <div className="text-white bg-red-400 pl-3 pr-3 pt-3 rounded pb-3">
                                Error while deleting.
                            </div>
                        )}
                        <Label>
                            Do you want do delete the book <b>"{book.title}"</b>
                            ?
                        </Label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className={`flex justify-between`}>
                        <div>
                            <Button
                                className={`text-black bg-gray-200 hover:bg-gray-300`}
                                onClick={toggle}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div></div>
                        <div>
                            <Button
                                className={deleteButtonStyle}
                                isLoading={bookDeleteLoading}
                                disabled={bookDeleteLoading}
                                onClick={() => onDelete({ bookId: book.id })}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    );
};

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

const List = (props) => {
    const { books } = props;
    return (
        <ul className="divide-y divide-gray-100">
            {books.length > 0 &&
                books.map((book) => (
                    <ListItem key={book.id} book={book} {...props} />
                ))}
        </ul>
    );
};

const Books = () => {
    const dispatch = useDispatch();

    const [authors, setAuthors] = useState([]);

    const listAuthors = () => {
        dispatch(authorsActions.authorsList());
    };
    const listBooks = () => {
        dispatch(booksActions.booksList());
    };
    const onCreateBook = ({ bookInfo }) => {
        dispatch(booksActions.booksCreate({ bookInfo }));
    };
    const onEditBook = ({ bookId, bookInfo }) => {
        dispatch(booksActions.booksEdit({ bookId, bookInfo }));
    };
    const onDeleteBook = ({ bookId }) => {
        dispatch(booksActions.booksDelete({ bookId }));
    };
    const onFormClear = () => {
        dispatch(booksActions.clearBooksForm());
    };
    useEffect(() => {
        listBooks();
        listAuthors();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isLoading =
        useSelector((state) => state.books.list.isLoading) || false;
    const books = useSelector((state) => state.books.list.data) || [];

    const bookCreateSuccess = useSelector(
        (state) => state.books.create.success
    );
    const bookCreateError = useSelector((state) => state.books.create.error);
    const bookCreateLoading = useSelector(
        (state) => state.books.create.isLoading
    );

    const bookEditSuccess = useSelector((state) => state.books.edit.success);
    const bookEditError = useSelector((state) => state.books.edit.error);
    const bookEditLoading = useSelector((state) => state.books.edit.isLoading);

    const bookDeleteSuccess = useSelector(
        (state) => state.books.delete.success
    );
    const bookDeleteError = useSelector((state) => state.books.delete.error);
    const bookDeleteLoading = useSelector(
        (state) => state.books.delete.isLoading
    );

    const authorsData = useSelector((state) => state.authors.list.data);

    useEffect(() => {
        let normalizedAuthorsList = [];
        if (authorsData.length > 0) {
            authorsData.map((eachAuthor) =>
                normalizedAuthorsList.push({
                    id: eachAuthor.id,
                    text: eachAuthor.name,
                })
            );
        }
        setAuthors(normalizedAuthorsList);
    }, [authorsData]);

    const topBarProps = {
        onCreateBook,
        listBooks,
        bookCreateSuccess,
        bookCreateError,
        bookCreateLoading,
        onFormClear,
        authors,
    };

    const listProps = {
        bookEditSuccess,
        bookEditError,
        bookEditLoading,
        onEditBook,
        listBooks,
        onDeleteBook,
        onFormClear,
        bookDeleteSuccess,
        bookDeleteError,
        bookDeleteLoading,
        books,
        authors,
    };
    return (
        <div>
            <TopBar {...topBarProps} />
            {isLoading && (
                <div className="mt-5 flex justify-around">
                    <div className="content-center">
                        <Loading />
                    </div>
                </div>
            )}
            {!isLoading && <List {...listProps} />}
        </div>
    );
};
export default Books;
