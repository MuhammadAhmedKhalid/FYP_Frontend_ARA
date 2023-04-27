import { UPDATE_BATCH_FAILURE, UPDATE_BATCH_REQUEST, UPDATE_BATCH_SUCCESS } from './updateBatchTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateBatchRequest(payload) {
    const token = yield select(state => state.login.user.jwt);
    let result = yield call(fetch, `http://localhost:8080/updateBatch/${payload.batch_id}/${payload.department_id}`, {
        method: "PUT",
        body: payload.batchYear,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_BATCH_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_BATCH_FAILURE, message: "Batch already exists with this year." })
    }
}

export function* updateBatchSaga() {
    yield takeEvery(UPDATE_BATCH_REQUEST, updateBatchRequest)
}