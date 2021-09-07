import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as booksActions } from "../../state/books";
import { actions as authorsActions } from "../../state/authors";
import Loading from "../../modules/common/components/Loading";
import List from "../../modules/books/components/List/List";
import TopBar from "../../modules/books/components/TopBar";

const Books = () => {
    const dispatch = useDispatch();

    const [authors, setAuthors] = useState([]);

    const listAuthors = () => {
        dispatch(authorsActions.authorsList());
    };
    const listBooks = () => {
        dispatch(booksActions.booksList());
    };
    const onCreateBook = ({ bookInfo }) => {
        dispatch(booksActions.booksCreate({ bookInfo }));
    };
    const onEditBook = ({ bookId, bookInfo }) => {
        dispatch(booksActions.booksEdit({ bookId, bookInfo }));
    };
    const onDeleteBook = ({ bookId }) => {
        dispatch(booksActions.booksDelete({ bookId }));
    };
    const onFormClear = () => {
        dispatch(booksActions.clearBooksForm());
    };
    useEffect(() => {
        listBooks();
        listAuthors();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isLoadingList =
        useSelector((state) => state.books.list.isLoading) || false;
    const booksList = useSelector((state) => state.books.list.data) || [];

    const bookCreateSuccess = useSelector(
        (state) => state.books.create.success
    );
    const bookCreateError = useSelector((state) => state.books.create.error);
    const bookCreateLoading = useSelector(
        (state) => state.books.create.isLoading
    );

    const bookEditSuccess = useSelector((state) => state.books.edit.success);
    const bookEditError = useSelector((state) => state.books.edit.error);
    const bookEditLoading = useSelector((state) => state.books.edit.isLoading);

    const bookDeleteSuccess = useSelector(
        (state) => state.books.delete.success
    );
    const bookDeleteError = useSelector((state) => state.books.delete.error);
    const bookDeleteLoading = useSelector(
        (state) => state.books.delete.isLoading
    );

    const authorsData = useSelector((state) => state.authors.list.data);

    useEffect(() => {
        let normalizedAuthorsList = [];
        if (authorsData.length > 0) {
            authorsData.map((eachAuthor) =>
                normalizedAuthorsList.push({
                    id: eachAuthor.id,
                    text: eachAuthor.name,
                })
            );
        }
        setAuthors(normalizedAuthorsList);
    }, [authorsData]);

    const topBarProps = {
        onCreateBook,
        listBooks,
        bookCreateSuccess,
        bookCreateError,
        bookCreateLoading,
        onFormClear,
        authors,
    };

    const listProps = {
        bookEditSuccess,
        bookEditError,
        bookEditLoading,
        onEditBook,
        listBooks,
        onDeleteBook,
        onFormClear,
        bookDeleteSuccess,
        bookDeleteError,
        bookDeleteLoading,
        booksList,
        authors,
    };
    return (
        <div>
            <TopBar {...topBarProps} />
            {isLoadingList && (
                <div className="mt-5 flex justify-around">
                    <div className="content-center">
                        <Loading />
                    </div>
                </div>
            )}
            {!isLoadingList && <List {...listProps} />}
        </div>
    );
};
export default Books;
