/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactDom from 'react-dom';
import styles from './Modal.module.scss';

const Modal = ({
    isShowing,
    toggle,
    children,
    overlayClassName = '',
    modalClassName = '',
    isImagePreview,
    noPadding,
    noScroll,
    stylesRef,
}) => {
    useEffect(() => {
        if (!isShowing) return;

        const handleClickOutside = event => {
            const path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                const clickedElementClasses = path
                    .filter(classPath => !_.isEmpty(classPath.className))
                    .map(pathDetail => pathDetail.classList)
                    .reduce((list, item) => {
                        if (item) return [...list, ...item];
                        return list;
                    }, []);
                if (!clickedElementClasses.includes(stylesRef || styles.modalWrapper)) {
                    toggle();
                }
            }
        };

        const listener = e => {
            const escapeKeyCode = 27;
            if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === escapeKeyCode) {
                e.preventDefault();
                e.stopPropagation();
                if (isShowing) {
                    toggle();
                }
            }
        };

        document.addEventListener('click', handleClickOutside, true);
        window.addEventListener('keyup', listener);
        document.body.style.overflow = isShowing ? 'hidden' : 'scroll';

        return () => {
            window.removeEventListener('keyup', listener);
            if (!isImagePreview) {
                document.body.style.position = 'static';
                document.body.style.overflowY = 'scroll';
            }
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isShowing]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isShowing) return null;
    return ReactDom.createPortal(
        <div className={`${overlayClassName} ${styles.modalOverlay}`}>
            <div className={noScroll ? styles.modalWrapperNoScroll : styles.modalWrapper}>
                <div className={`${modalClassName} ${noPadding ? styles.modalNoPadding : styles.modal}`}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export const ModalHeader = ({ children, noBorders }) => (
    <div className={noBorders ? styles.modalHeaderNoBorder : styles.modalHeader}>{children || 'Title'}</div>
);

export const ModalBody = ({ children }) => <div className={styles.modalBody}>{children}</div>;

export const ModalFooter = ({ children, noBorders }) => (
    <div className={noBorders ? styles.modalFooterNoBorders : styles.modalFooter}>{children}</div>
);

export const useModal = () => {
    const [isShowing2, setIsShowing2] = useState(false);

    function toggle2() {
        setIsShowing2(!isShowing2);
    }

    return [isShowing2, toggle2];
};

export default Modal;

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    darkBackground: PropTypes.bool,
    isImagePreview: PropTypes.any,
    isShowing: PropTypes.any,
    modalClassName: PropTypes.string,
    noPadding: PropTypes.bool,
    noScroll: PropTypes.any,
    overlayClassName: PropTypes.string,
    stylesRef: PropTypes.any,
    toggle: PropTypes.func
}

ModalBody.propTypes = {
    children: PropTypes.element.isRequired,
};

ModalHeader.propTypes = {
    children: PropTypes.element.isRequired,
    noBorders: PropTypes.bool,
};

ModalFooter.propTypes = {
    children: PropTypes.element.isRequired,
    noBorders: PropTypes.bool,
};
