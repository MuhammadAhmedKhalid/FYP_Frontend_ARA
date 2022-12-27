import { GET_ADMIN_FAILURE, GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS } from './getAdminTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getAdminRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.get, `http://localhost:8080/get-admin/${data.query}`, { headers });
        yield put({ type: GET_ADMIN_SUCCESS, data: result })
    } catch (e) {
        yield put({ type: GET_ADMIN_FAILURE, message: e.message })
    }
}

export function* getAdminSaga() {
    yield takeEvery(GET_ADMIN_REQUEST, getAdminRequest)
}