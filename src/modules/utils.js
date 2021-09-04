import moment from "moment";

export const transformDateToText = (originalDate) =>
    moment(originalDate).format("dddd, MMMM Do of YYYY");
export const getErrorMessage = (errors) => {
    let defaultMessage = "Please fill this field correctly";
    const messageList = [
        { type: "required", text: "This field is required" },
        { type: "minLength", text: "This field length is under the minimum" },
        { type: "maxLength", text: "This field length is above the maximum" },
    ];
    let searchMessage = messageList.filter((value) => {
        return value.type === errors.type;
    });
    return searchMessage.length > 0 ? searchMessage[0].text : defaultMessage;
};
