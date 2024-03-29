import { ADD_BATCH_FAILURE, ADD_BATCH_REQUEST, ADD_BATCH_SUCCESS } from './addBatchTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addBatch(batch) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addBatch', batch.batch, { headers });
        yield put({ type: ADD_BATCH_SUCCESS, message: "Batch added successfully." })
    } catch (error) {
        yield put({ type: ADD_BATCH_FAILURE, message: error.response.data })
    }
}

export function* addBatchSaga() {
    yield takeEvery(ADD_BATCH_REQUEST, addBatch)
}