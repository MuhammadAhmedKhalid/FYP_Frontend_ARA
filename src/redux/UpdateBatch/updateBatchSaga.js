import { UPDATE_BATCH_FAILURE, UPDATE_BATCH_REQUEST, UPDATE_BATCH_SUCCESS } from './updateBatchTypes'
import { put, takeEvery, call } from 'redux-saga/effects'

function* updateBatchRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `https://fypbackendara-production.up.railway.app/updateBatch/${payload.batchId}`, {
        method: "PUT",
        body: JSON.stringify(payload.batch),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_BATCH_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_BATCH_FAILURE, message: "Batch already exists." })
    }
}

export function* updateBatchSaga() {
    yield takeEvery(UPDATE_BATCH_REQUEST, updateBatchRequest)
}