import { DELETE_STAFF_REQ_FAILURE, DELETE_STAFF_REQ_REQUEST, DELETE_STAFF_REQ_SUCCESS } from './delStaffReqTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteStaffRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteStaffRequest/${data.query}`, { headers });
        yield put({ type: DELETE_STAFF_REQ_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_STAFF_REQ_FAILURE, message: e.message})
    }
}

export function* deleteStaffRequestSaga() {
    yield takeEvery(DELETE_STAFF_REQ_REQUEST, deleteStaffRequest)
}