import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../modules/common/components/Button";
import Input from "../../modules/common/components/Input";
import Loading from "../../modules/common/components/Loading";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    useModal,
} from "../../modules/common/components/Modal";
import { actions as authorActions } from "../../state/authors";
import styles from "./Authors.module.scss";
import stylesModal from "../../modules/common/components/Modal/Modal.module.scss";
import { transformDateToText } from "../../modules/utils";
import Label from "../../modules/common/components/Label";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import classNames from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import FormErrors from "../../modules/common/components/FormErrors";

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
                            <AuthorsModal
                                isShowing={isShowingEditModal}
                                toggle={toggleEditModal}
                                onAction={editAction}
                                listAuthors={listAuthors}
                                authorActionSuccess={authorEditSuccess}
                                authorActionError={authorEditError}
                                authorActionLoading={authorEditLoading}
                                onFormClear={onFormClear}
                                type={`edit`}
                                author={author}
                            />
                            <AuthorsDeleteModal
                                isShowing={isShowingDeleteModal}
                                toggle={toggleDeleteModal}
                                onDelete={onDeleteAuthor}
                                author={author}
                                authorDeleteSuccess={authorDeleteSuccess}
                                authorDeleteError={authorDeleteError}
                                authorDeleteLoading={authorDeleteLoading}
                                onFormClear={onFormClear}
                            />
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
    const { authors } = props;
    return (
        <ul className="divide-y divide-gray-100">
            {authors.length > 0 &&
                authors.map((author) => (
                    <ListItem key={author.id} author={author} {...props} />
                ))}
        </ul>
    );
};

const AuthorsDeleteModal = ({
    isShowing,
    toggle,
    onDelete,
    author,
    authorDeleteLoading,
    authorDeleteSuccess,
    authorDeleteError,
    onFormClear,
}) => {
    const deleteButtonStyle = classNames(`text-white bg-red-500`, {
        [`hover:bg-red-700`]: !authorDeleteLoading,
    });

    useEffect(() => {
        if (isShowing && authorDeleteSuccess) {
            toggle();
        }
    }, [authorDeleteSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        <div>Delete Author</div>
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
                        {authorDeleteError && (
                            <div className="text-white bg-red-400 pl-3 pr-3 pt-3 rounded pb-3">
                                Error while deleting.
                            </div>
                        )}
                        <Label>
                            Do you want do delete the author{" "}
                            <b>"{author.name}"</b>?
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
                                isLoading={authorDeleteLoading}
                                disabled={authorDeleteLoading}
                                onClick={() =>
                                    onDelete({ authorId: author.id })
                                }
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

const AuthorsModal = ({
    isShowing,
    toggle,
    onAction,
    listAuthors,
    authorActionSuccess,
    authorActionError,
    authorActionLoading,
    type = "create",
    onFormClear,
    author = null,
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
        onAction({ authorInfo: formData });
    };

    useEffect(() => {
        if (authorActionSuccess && isShowing) {
            if (type === "create") {
                listAuthors();
            }
            toggle();
        }
    }, [authorActionSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (type === "edit" && isShowing) {
            setValue("name", author.name);
            setValue("birthdate", moment(author.birthdate).toDate());
        }
        if (!isShowing) {
            setValue("name", "");
            setValue("birthdate", "");
            onFormClear();
            clearErrors();
        }
    }, [isShowing]); // eslint-disable-line react-hooks/exhaustive-deps

    const createButtonStyle = classNames(`text-white bg-green-500`, {
        [`hover:bg-green-700`]: !authorActionLoading,
    });
    let title = `Create Author`;
    let errorMessage = `Error while creating.`;
    let buttonText = `Create`;
    if (type === "edit") {
        title = `Edit Author`;
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
                        {authorActionError && (
                            <div className="text-white bg-red-400 pl-3 pr-3 pt-3 rounded pb-3">
                                {errorMessage}
                            </div>
                        )}
                        <div className={`mb-2`}>
                            <Label>Name</Label>
                            <Input
                                placeholder="Name"
                                additional={register(`name`, {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 255,
                                })}
                                errors={errors?.name}
                            />
                        </div>
                        <div className={`mb-2`}>
                            <Label>Date of Birth</Label>
                            <Controller
                                control={control}
                                name={`birthdate`}
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
                            <FormErrors errors={errors?.birthdate} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="text-right">
                        <Button
                            className={createButtonStyle}
                            isLoading={authorActionLoading}
                            disabled={authorActionLoading}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    );
};

const TopBar = ({
    onCreateAuthor,
    listAuthors,
    authorCreateSuccess,
    authorCreateError,
    authorCreateLoading,
    onFormClear,
}) => {
    const [isShowingCreateModal, toggleCreateModal] = useModal();

    return (
        <div className="p-4">
            <AuthorsModal
                isShowing={isShowingCreateModal}
                toggle={toggleCreateModal}
                onAction={onCreateAuthor}
                listAuthors={listAuthors}
                authorActionSuccess={authorCreateSuccess}
                authorActionError={authorCreateError}
                authorActionLoading={authorCreateLoading}
                onFormClear={onFormClear}
            />
            <Button
                onClick={toggleCreateModal}
                className="border-2 border-gray-700 bg-green-500 hover:bg-green-700 text-white"
            >
                Create Author
            </Button>
        </div>
    );
};

const Authors = () => {
    const dispatch = useDispatch();

    const listAuthors = () => {
        dispatch(authorActions.authorsList());
    };
    const onCreateAuthor = ({ authorInfo }) => {
        dispatch(authorActions.authorsCreate({ authorInfo }));
    };
    const onEditAuthor = ({ authorId, authorInfo }) => {
        dispatch(authorActions.authorsEdit({ authorId, authorInfo }));
    };
    const onDeleteAuthor = ({ authorId }) => {
        dispatch(authorActions.authorsDelete({ authorId }));
    };
    const onFormClear = () => {
        dispatch(authorActions.clearAuthorForm());
    };
    useEffect(listAuthors, []); // eslint-disable-line react-hooks/exhaustive-deps
    const isLoading =
        useSelector((state) => state.authors.list.isLoading) || false;
    const authors = useSelector((state) => state.authors.list.data) || [];

    const authorCreateSuccess = useSelector(
        (state) => state.authors.create.success
    );
    const authorCreateError = useSelector(
        (state) => state.authors.create.error
    );
    const authorCreateLoading = useSelector(
        (state) => state.authors.create.isLoading
    );

    const authorEditSuccess = useSelector(
        (state) => state.authors.edit.success
    );
    const authorEditError = useSelector((state) => state.authors.edit.error);
    const authorEditLoading = useSelector(
        (state) => state.authors.edit.isLoading
    );

    const authorDeleteSuccess = useSelector(
        (state) => state.authors.delete.success
    );
    const authorDeleteError = useSelector(
        (state) => state.authors.delete.error
    );
    const authorDeleteLoading = useSelector(
        (state) => state.authors.delete.isLoading
    );
    return (
        <div>
            <TopBar
                onCreateAuthor={onCreateAuthor}
                listAuthors={listAuthors}
                authorCreateSuccess={authorCreateSuccess}
                authorCreateError={authorCreateError}
                authorCreateLoading={authorCreateLoading}
                onFormClear={onFormClear}
            />
            {isLoading && (
                <div className="mt-5 flex justify-around">
                    <div className="content-center">
                        <Loading />
                    </div>
                </div>
            )}
            {!isLoading && (
                <List
                    authorEditSuccess={authorEditSuccess}
                    authorEditError={authorEditError}
                    authorEditLoading={authorEditLoading}
                    onEditAuthor={onEditAuthor}
                    listAuthors={listAuthors}
                    onDeleteAuthor={onDeleteAuthor}
                    onFormClear={onFormClear}
                    authorDeleteSuccess={authorDeleteSuccess}
                    authorDeleteError={authorDeleteError}
                    authorDeleteLoading={authorDeleteLoading}
                    authors={authors}
                />
            )}
        </div>
    );
};
export default Authors;
