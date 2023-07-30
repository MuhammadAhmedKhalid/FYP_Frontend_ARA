import { DELETE_STAFF_REQ_FAILURE, DELETE_STAFF_REQ_REQUEST, DELETE_STAFF_REQ_SUCCESS } from './delStaffReqTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteStaffRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteStaffRequest/${data.query}`, { headers });
        yield put({ type: DELETE_STAFF_REQ_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_STAFF_REQ_FAILURE, message: e.message})
    }
}

export function* deleteStaffRequestSaga() {
    yield takeEvery(DELETE_STAFF_REQ_REQUEST, deleteStaffRequest)
}