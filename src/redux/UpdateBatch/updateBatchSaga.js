import { UPDATE_BATCH_FAILURE, UPDATE_BATCH_REQUEST, UPDATE_BATCH_SUCCESS } from './updateBatchTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateBatchRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updateBatch/${payload.batch_id}/${payload.department_id}`, {
            method: "PUT",
            body: payload.batchYear,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_BATCH_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_BATCH_FAILURE, message: e.message })
    }
}

export function* updateBatchSaga() {
    yield takeEvery(UPDATE_BATCH_REQUEST, updateBatchRequest)
}