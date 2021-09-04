import { MODULE_NAME, DEFAULT_REQUEST_TIMEOUT_MS } from './connectivityConstants';

/**
 * Actions constants
 */

export const API_CALL_REQUESTED = `${MODULE_NAME}/API_CALL_REQUESTED`;

/**
 * Action creators
 */

export const requestApiCall = (callName, args, actions, timeoutMS = DEFAULT_REQUEST_TIMEOUT_MS) => ({
    type: API_CALL_REQUESTED,
    payload: {
        callName,
        args,
        actions,
        timeoutMS,
    },
});

export const announceApiCall = (type, args) => ({
    type,
    payload: { args },
});

export const fulfillApiCall = (type, args, data) => ({
    type,
    payload: { args, data },
});

export const failApiCall = (type, args, error) => ({
    type,
    payload: { args, error },
    error: true,
    meta: error,
});
