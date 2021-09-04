import produce from 'immer';

const initialState = {};

export const reducer = produce((state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
});

export default reducer;
