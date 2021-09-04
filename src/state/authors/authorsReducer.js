import produce from "immer";
import * as actions from "./authorsActions";
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

const getAuthorIndex = (list, authorId) =>
    list.findIndex((item) => item.id === authorId);

export const reducer = produce((state = initialState, action) => {
    const data = action?.payload?.data;
    switch (action.type) {
        case actions.AUTHORS_LIST.REQUESTED:
            state.list.isLoading = true;
            state.list.data = {};
            break;
        case actions.AUTHORS_LIST.SUCCEEDED:
            const { list } = data;
            state.list.data = list;
            state.list.isLoading = false;
            break;
        case actions.AUTHORS_CREATE.REQUESTED:
            state.create.isLoading = true;
            state.create.success = false;
            state.create.error = false;
            break;
        case actions.AUTHORS_CREATE.SUCCEEDED:
            state.create.isLoading = false;
            state.create.success = true;
            state.create.error = false;
            break;
        case actions.AUTHORS_CREATE.FAILED:
            state.create.isLoading = false;
            state.create.success = false;
            state.create.error = true;
            break;
        case actions.AUTHORS_EDIT.REQUESTED:
            state.edit.isLoading = true;
            state.edit.success = false;
            state.edit.error = false;
            break;
        case actions.AUTHORS_EDIT.SUCCEEDED:
            let authorIndex = getAuthorIndex(
                state.list.data,
                action.payload.args.authorId
            );
            state.list.data[authorIndex] = data.info;
            state.edit.isLoading = false;
            state.edit.success = true;
            state.edit.error = false;
            break;
        case actions.AUTHORS_EDIT.FAILED:
            state.edit.isLoading = false;
            state.edit.success = false;
            state.edit.error = true;
            break;
        case actions.AUTHORS_DELETE.REQUESTED:
            state.delete.isLoading = true;
            state.delete.success = false;
            state.delete.error = false;
            break;
        case actions.AUTHORS_DELETE.SUCCEEDED:
            state.list.data.splice(
                getAuthorIndex(
                    state.list.data,
                    action.payload.args.authorId
                ),
                1
            );
            state.delete.isLoading = false;
            state.delete.success = true;
            state.delete.error = false;
            break;
        case actions.AUTHORS_DELETE.FAILED:
            state.delete.isLoading = false;
            state.delete.success = false;
            state.delete.error = true;
            break;
        case actions.AUTHORS_FORM_CLEAR:
            state.create = initialState.create;
            state.edit = initialState.edit;
            state.delete = initialState.delete;
            break;
        default:
            return state;
    }
});

export default reducer;
