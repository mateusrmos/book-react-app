import PropTypes from "prop-types";
import classNames from "classnames";
import { useEffect } from "react";
import Button from "../../../common/components/Button";
import Label from "../../../common/components/Label";
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../../common/components/Modal";
import styles from "./AuthorsDeleteModal.module.scss";
import stylesModal from "../../../common/components/Modal/Modal.module.scss";

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

AuthorsDeleteModal.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.any,
        name: PropTypes.any
    }),
    authorDeleteError: PropTypes.any,
    authorDeleteLoading: PropTypes.any,
    authorDeleteSuccess: PropTypes.any,
    isShowing: PropTypes.any,
    onDelete: PropTypes.func,
    onFormClear: PropTypes.func,
    toggle: PropTypes.func
}
export default AuthorsDeleteModal;
