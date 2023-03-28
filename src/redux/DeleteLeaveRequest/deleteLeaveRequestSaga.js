import { DELETE_LEAVE_FAILURE, DELETE_LEAVE_REQUEST, DELETE_LEAVE_SUCCESS } from './deleteLeaveRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteLeaveRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteLeaveRequest/${data.query}`, { headers });
        yield put({ type: DELETE_LEAVE_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_LEAVE_FAILURE, message: e.message})
    }
}

export function* deleteLeaveRequestSaga() {
    yield takeEvery(DELETE_LEAVE_REQUEST, deleteLeaveRequest)
}