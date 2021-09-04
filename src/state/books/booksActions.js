import { requestActions } from "../actionsCreator";
import { MODULE_NAME } from "./booksConstants";
import { requestApiCall } from "../connectivity/connectivityActions";
import api from "../../api";

export const BOOKS_LIST = requestActions(MODULE_NAME, "BOOKS_LIST");
export const BOOKS_CREATE = requestActions(MODULE_NAME, "BOOKS_CREATE");
export const BOOKS_INFO = requestActions(MODULE_NAME, "BOOKS_INFO");
export const BOOKS_EDIT = requestActions(MODULE_NAME, "BOOKS_EDIT");
export const BOOKS_DELETE = requestActions(MODULE_NAME, "BOOKS_DELETE");
export const BOOKS_FORM_CLEAR = "BOOKS_FORM_CLEAR";

export const booksList = () =>
    requestApiCall(api.names.booksList, {}, BOOKS_LIST);
export const booksCreate = ({ bookInfo }) =>
    requestApiCall(api.names.booksCreate, { bookInfo }, BOOKS_CREATE);
export const booksInfo = ({ bookId }) =>
    requestApiCall(api.names.booksInfo, { bookId }, BOOKS_INFO);
export const booksEdit = ({ bookId, bookInfo }) =>
    requestApiCall(
        api.names.booksEdit,
        {
            bookId,
            bookInfo,
        },
        BOOKS_EDIT
    );
export const booksDelete = ({ bookId }) =>
    requestApiCall(api.names.booksDelete, { bookId }, BOOKS_DELETE);

export const clearBooksForm = () => ({ type: BOOKS_FORM_CLEAR });
