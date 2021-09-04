import { call, put, race, takeEvery, delay } from 'redux-saga/effects';
import api from '../api';
import modules from '../state';

// worker Saga: will be fired on API_CALL_REQUESTED connectivity.actions
function* callApi(callName, args, timeoutMS) {
    let winner;
    let request;
    try {
        request = call(api.calls[callName], args);
        winner = yield race({
            requestResult: request,
            requestTimeout: delay(timeoutMS),
        });
        if (winner.requestTimeout) {
            const error = new Error('Request timeout');
            error.connectivityError = true;
            return { error };
        }

        if (winner.requestResult === null || winner.requestResult === undefined) {
            const error = new Error('Request failed');
            error.connectivityError = true;
            return { error };
        }

        return winner?.requestResult?.data || winner?.requestResult;
    } catch (error) {
        return { error: error?.response?.data?.error };
    }
}

function* startApiCall(action) {
    const { callName, timeoutMS } = action.payload;
    const args = { ...action.payload.args };

    yield put(modules.connectivity.actions.announceApiCall(action.payload.actions.REQUESTED, args));
    const callInfo = yield* callApi(callName, args, timeoutMS);
    const { error } = callInfo;
    if (error) {
        yield put(modules.connectivity.actions.failApiCall(action.payload.actions.FAILED, args, error));
    } else {
        yield put(modules.connectivity.actions.fulfillApiCall(action.payload.actions.SUCCEEDED, args, callInfo));
    }
}

/*
 Starts startApiCall on each dispatched `API_CALL_REQUESTED` action.
 */
function* watchCallRequests() {
    yield takeEvery(modules.connectivity.actions.API_CALL_REQUESTED, startApiCall);
}

// single entry point to start all Sagas at once
export function* connectivitySaga() {
    yield watchCallRequests();
}
