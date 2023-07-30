import { DELETE_LEAVE_FAILURE, DELETE_LEAVE_REQUEST, DELETE_LEAVE_SUCCESS } from './deleteLeaveRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteLeaveRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteLeaveRequest/${data.query}`, { headers });
        yield put({ type: DELETE_LEAVE_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_LEAVE_FAILURE, message: e.message})
    }
}

export function* deleteLeaveRequestSaga() {
    yield takeEvery(DELETE_LEAVE_REQUEST, deleteLeaveRequest)
}