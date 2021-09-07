import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../common/components/Button";
import DatePicker from "../../../common/components/DatePicker/DatePicker";
import Input from "../../../common/components/Input";
import Label from "../../../common/components/Label";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../../common/components/Modal";
import styles from "./AuthorsModal.module.scss";
import stylesModal from "../../../common/components/Modal/Modal.module.scss";

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
                            <DatePicker
                                control={control}
                                Controller={Controller}
                                rules={{
                                    required: true,
                                    pattern:
                                        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                }}
                                name={`birthdate`}
                                errors={errors?.birthdate}
                            />
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

AuthorsModal.propTypes = {
    author: PropTypes.shape({
        birthdate: PropTypes.any,
        name: PropTypes.any
    }),
    authorActionError: PropTypes.any,
    authorActionLoading: PropTypes.any,
    authorActionSuccess: PropTypes.any,
    isShowing: PropTypes.any,
    listAuthors: PropTypes.func,
    onAction: PropTypes.func,
    onFormClear: PropTypes.func,
    toggle: PropTypes.func,
    type: PropTypes.string
}
export default AuthorsModal;
