import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../modules/common/components/Loading";
import { actions as authorActions } from "../../state/authors";
import TopBar from "../../modules/authors/components/TopBar";
import List from "../../modules/authors/components/List";

const Authors = () => {
    const dispatch = useDispatch();

    const listAuthors = () => {
        dispatch(authorActions.authorsList());
    };
    const onCreateAuthor = ({ authorInfo }) => {
        dispatch(authorActions.authorsCreate({ authorInfo }));
    };
    const onEditAuthor = ({ authorId, authorInfo }) => {
        dispatch(authorActions.authorsEdit({ authorId, authorInfo }));
    };
    const onDeleteAuthor = ({ authorId }) => {
        dispatch(authorActions.authorsDelete({ authorId }));
    };
    const onFormClear = () => {
        dispatch(authorActions.clearAuthorForm());
    };
    useEffect(listAuthors, []); // eslint-disable-line react-hooks/exhaustive-deps
    const isLoadingList =
        useSelector((state) => state.authors.list.isLoading) || false;
    const authorsList = useSelector((state) => state.authors.list.data) || [];

    const authorCreateSuccess = useSelector(
        (state) => state.authors.create.success
    );
    const authorCreateError = useSelector(
        (state) => state.authors.create.error
    );
    const authorCreateLoading = useSelector(
        (state) => state.authors.create.isLoading
    );

    const authorEditSuccess = useSelector(
        (state) => state.authors.edit.success
    );
    const authorEditError = useSelector((state) => state.authors.edit.error);
    const authorEditLoading = useSelector(
        (state) => state.authors.edit.isLoading
    );

    const authorDeleteSuccess = useSelector(
        (state) => state.authors.delete.success
    );
    const authorDeleteError = useSelector(
        (state) => state.authors.delete.error
    );
    const authorDeleteLoading = useSelector(
        (state) => state.authors.delete.isLoading
    );

    const topBarProps = {
        onCreateAuthor,
        listAuthors,
        authorCreateSuccess,
        authorCreateError,
        authorCreateLoading,
        onFormClear,
    };

    const listProps = {
        authorEditSuccess,
        authorEditError,
        authorEditLoading,
        onEditAuthor,
        listAuthors,
        onDeleteAuthor,
        onFormClear,
        authorDeleteSuccess,
        authorDeleteError,
        authorDeleteLoading,
        authorsList,
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
export default Authors;
