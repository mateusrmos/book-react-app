import produce from "immer";
import * as actions from "./booksActions";
const initialState = {
    list: {
        data: {},
        isLoading: false,
    },
    info: {
        data: {},
        isLoading: false,
    },
    create: {
        error: false,
        success: false,
        isLoading: false,
    },
    edit: {
        error: false,
        success: false,
        isLoading: false,
    },
    delete: {
        error: false,
        success: false,
        isLoading: false,
    },
};

const getBookIndex = (list, bookId) =>
    list.findIndex((item) => item.id === bookId);

export const reducer = produce((state = initialState, action) => {
    const data = action?.payload?.data;
    switch (action.type) {
        case actions.BOOKS_LIST.REQUESTED:
            state.list.isLoading = true;
            state.list.data = {};
            break;
        case actions.BOOKS_LIST.SUCCEEDED:
            const { list } = data;
            state.list.data = list;
            state.list.isLoading = false;
            break;
        case actions.BOOKS_CREATE.REQUESTED:
            state.create.isLoading = true;
            state.create.success = false;
            state.create.error = false;
            break;
        case actions.BOOKS_CREATE.SUCCEEDED:
            state.create.isLoading = false;
            state.create.success = true;
            state.create.error = false;
            break;
        case actions.BOOKS_CREATE.FAILED:
            state.create.isLoading = false;
            state.create.success = false;
            state.create.error = true;
            break;
        case actions.BOOKS_EDIT.REQUESTED:
            state.edit.isLoading = true;
            state.edit.success = false;
            state.edit.error = false;
            break;
        case actions.BOOKS_EDIT.SUCCEEDED:
            let authorIndex = getBookIndex(
                state.list.data,
                action.payload.args.bookId
            );
            state.list.data[authorIndex] = data.info;
            state.edit.isLoading = false;
            state.edit.success = true;
            state.edit.error = false;
            break;
        case actions.BOOKS_EDIT.FAILED:
            state.edit.isLoading = false;
            state.edit.success = false;
            state.edit.error = true;
            break;
        case actions.BOOKS_DELETE.REQUESTED:
            state.delete.isLoading = true;
            state.delete.success = false;
            state.delete.error = false;
            break;
        case actions.BOOKS_DELETE.SUCCEEDED:
            state.list.data.splice(
                getBookIndex(state.list.data, action.payload.args.bookId),
                1
            );
            state.delete.isLoading = false;
            state.delete.success = true;
            state.delete.error = false;
            break;
        case actions.BOOKS_DELETE.FAILED:
            state.delete.isLoading = false;
            state.delete.success = false;
            state.delete.error = true;
            break;
        case actions.BOOKS_FORM_CLEAR:
            state.create = initialState.create;
            state.edit = initialState.edit;
            state.delete = initialState.delete;
            break;
        default:
            return state;
    }
});

export default reducer;
