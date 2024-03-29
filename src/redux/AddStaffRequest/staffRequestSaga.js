import { ADD_STAFF_REQ_FAILURE, ADD_STAFF_REQ_REQUEST, ADD_STAFF_REQ_SUCCESS } from './staffRequestTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addStaffRequest(staff) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addStaffRequest', staff.staff, { headers });
        yield put({ type: ADD_STAFF_REQ_SUCCESS, message: "Staff request added successfully." })
    } catch (error) {
        yield put({ type: ADD_STAFF_REQ_FAILURE, message: "Add staff request operation failed." })
    }
}

export function* addStaffRequestSaga() {
    yield takeEvery(ADD_STAFF_REQ_REQUEST, addStaffRequest)
}