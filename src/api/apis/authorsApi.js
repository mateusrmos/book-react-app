import client from "../client";

export const authorsList = () => client.get(`/api/author/list`);

export const authorsCreate = ({ authorInfo }) => {
    let { name, birthdate } = authorInfo;
    birthdate = birthdate.toISOString().slice(0, 10);
    return client.post(`/api/author`, { name, birthdate });
};

export const authorsInfo = ({ authorId }) =>
    client.get(`/api/author/${authorId}`);

export const authorsEdit = ({ authorId, authorInfo }) => {
    let { name, birthdate } = authorInfo;
    birthdate = birthdate.toISOString().slice(0, 10);
    return client.patch(`/api/author/${authorId}`, { name, birthdate });
};

export const authorsDelete = ({ authorId }) =>
    client.delete(`/api/author/${authorId}`);
