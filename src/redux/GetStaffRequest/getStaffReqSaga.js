import { GET_STAFF_REQ_FAILURE, GET_STAFF_REQ_REQUEST, GET_STAFF_REQ_SUCCESS } from './getStaffReqTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getStaffRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url  = `https://fypbackendara-production.up.railway.app/getStaffRequests/${data.query}`;
        let result = yield call(axios.get, url, { headers });
        yield put({ type: GET_STAFF_REQ_SUCCESS, result })
    } catch (e) {
        yield put({ type: GET_STAFF_REQ_FAILURE, message: e.message })
    }
}

export function* getStaffReqSaga() {
    yield takeEvery(GET_STAFF_REQ_REQUEST, getStaffRequest)
}