import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../common/components/Input";
import Label from "../../../common/components/Label";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../../common/components/Modal";
import styles from "./BooksModal.module.scss";
import stylesModal from "../../../common/components/Modal/Modal.module.scss";
import Select from "../../../common/components/Select";
import Button from "../../../common/components/Button";
import DatePicker from "../../../common/components/DatePicker/DatePicker";

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
                            <DatePicker
                                control={control}
                                Controller={Controller}
                                rules={{
                                    required: true,
                                    pattern:
                                        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                }}
                                name="launchDate"
                                errors={errors?.launchDate}
                            />
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

BooksModal.propTypes = {
    authors: PropTypes.any,
    book: PropTypes.shape({
        author: PropTypes.shape({
            id: PropTypes.any,
        }),
        launchDate: PropTypes.any,
        title: PropTypes.any,
    }),
    bookActionError: PropTypes.any,
    bookActionLoading: PropTypes.any,
    bookActionSuccess: PropTypes.any,
    isShowing: PropTypes.any,
    listBooks: PropTypes.func,
    onAction: PropTypes.func,
    onFormClear: PropTypes.func,
    toggle: PropTypes.func,
    type: PropTypes.string,
};
export default BooksModal;
