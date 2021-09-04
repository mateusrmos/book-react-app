import moment from "moment";
import client from "../client";

export const booksList = () => client.get(`/api/book/list`);

export const booksCreate = ({ bookInfo }) => {
    bookInfo.launchDate = moment(bookInfo.launchDate).format("Y-MM-DD");
    return client.post(`/api/book`, bookInfo);
};

export const booksInfo = ({ bookId }) => client.get(`/api/book/${bookId}`);

export const booksEdit = ({ bookId, bookInfo }) => {
    bookInfo.launchDate = moment(bookInfo.launchDate).format("Y-MM-DD");
    return client.patch(`/api/book/${bookId}`, bookInfo);
};

export const booksDelete = ({ bookId }) => client.delete(`/api/book/${bookId}`);
