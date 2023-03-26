import { MAKE_RES_BUSY_FAILURE, MAKE_RES_BUSY_REQUEST, MAKE_RES_BUSY_SUCCESS } from './makeResBusyTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* makeResBusyRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/makeResBusy', payload, { headers });
        yield put({ type: MAKE_RES_BUSY_SUCCESS, message: "Operation performed successfully." })
    
    } catch (error) {
        yield put({ type: MAKE_RES_BUSY_FAILURE, message: "Operation failed." })
    }
}

export function* makeResBusySaga() {
    yield takeEvery(MAKE_RES_BUSY_REQUEST, makeResBusyRequest)
}