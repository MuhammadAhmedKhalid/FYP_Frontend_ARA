import { DELETE_BATCH_FAILURE, DELETE_BATCH_REQUEST, DELETE_BATCH_SUCCESS } from './deleteBatchTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteBatch(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteBatch/${payload.query}`, { headers });
        yield put({ type: DELETE_BATCH_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_BATCH_FAILURE, message: e.message})
    }
}

export function* deleteBatchSaga() {
    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatch)
}