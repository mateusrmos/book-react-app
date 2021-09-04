import { combineReducers } from "redux";

import * as authors from "./authors";
import * as books from "./books";
import * as connectivity from "./connectivity";
import * as router from "./router";

const state = {
    authors,
    books,
    connectivity,
    router,
};
export default state;

export const createRootReducer = (history) =>
    combineReducers({
        authors: authors.reducers.reducer,
        books: books.reducers.reducer,
        connectivity: connectivity.reducers.reducer,
        router: router.reducers.reducer(history),
    });
