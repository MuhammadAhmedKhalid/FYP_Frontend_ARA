import { ADD_STAFF_REQ_FAILURE, ADD_STAFF_REQ_REQUEST, ADD_STAFF_REQ_SUCCESS } from './staffRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* addStaffRequest(staff) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addStaffRequest', staff.staff, { headers });
        yield put({ type: ADD_STAFF_REQ_SUCCESS, message: "Staff request added successfully." })
    } catch (error) {
        yield put({ type: ADD_STAFF_REQ_FAILURE, message: "Add staff request operation failed." })
    }
}

export function* addStaffRequestSaga() {
    yield takeEvery(ADD_STAFF_REQ_REQUEST, addStaffRequest)
}