import { ADD_LEAVE_FAILURE, ADD_LEAVE_REQUEST, ADD_LEAVE_SUCCESS } from './addLeaveRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* addLeaveRequest(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addLeaveRequest', payload.leaveRequest, { headers });
        yield put({ type: ADD_LEAVE_SUCCESS, message: "Leave request added successfully." })
    } catch (error) {
        yield put({ type: ADD_LEAVE_FAILURE, message: "Add leave request operation failed." })
    }
}

export function* addLeaveRequestSaga() {
    yield takeEvery(ADD_LEAVE_REQUEST, addLeaveRequest)
}