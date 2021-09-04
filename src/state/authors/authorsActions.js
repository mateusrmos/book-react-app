import { requestActions } from "../actionsCreator";
import { MODULE_NAME } from "./authorsConstants";
import { requestApiCall } from "../connectivity/connectivityActions";
import api from "../../api";

export const AUTHORS_LIST = requestActions(MODULE_NAME, "AUTHORS_LIST");
export const AUTHORS_CREATE = requestActions(MODULE_NAME, "AUTHORS_CREATE");
export const AUTHORS_INFO = requestActions(MODULE_NAME, "AUTHORS_INFO");
export const AUTHORS_EDIT = requestActions(MODULE_NAME, "AUTHORS_EDIT");
export const AUTHORS_DELETE = requestActions(MODULE_NAME, "AUTHORS_DELETE");
export const AUTHORS_FORM_CLEAR = "AUTHORS_FORM_CLEAR";

export const authorsList = () =>
    requestApiCall(api.names.authorsList, {}, AUTHORS_LIST);
export const authorsCreate = ({ authorInfo }) =>
    requestApiCall(api.names.authorsCreate, { authorInfo }, AUTHORS_CREATE);
export const authorsInfo = ({ authorId }) =>
    requestApiCall(api.names.authorsInfo, { authorId }, AUTHORS_INFO);
export const authorsEdit = ({ authorId, authorInfo }) =>
    requestApiCall(
        api.names.authorsEdit,
        {
            authorId,
            authorInfo,
        },
        AUTHORS_EDIT
    );
export const authorsDelete = ({ authorId }) =>
    requestApiCall(api.names.authorsDelete, { authorId }, AUTHORS_DELETE);

export const clearAuthorForm = () => ({ type: AUTHORS_FORM_CLEAR });
