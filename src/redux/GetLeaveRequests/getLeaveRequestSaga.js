import { GET_LEAVE_FAILURE, GET_LEAVE_REQUEST, GET_LEAVE_SUCCESS } from './getLeaveRequestTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getLeaveRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url  = `http://localhost:8080/getLeaveRequests/${data.query}`;
        let result = yield call(axios.get, url, { headers });
        yield put({ type: GET_LEAVE_SUCCESS, result })
    } catch (e) {
        yield put({ type: GET_LEAVE_FAILURE, message: e.message })
    }
}

export function* getLeaveReqSaga() {
    yield takeEvery(GET_LEAVE_REQUEST, getLeaveRequest)
}