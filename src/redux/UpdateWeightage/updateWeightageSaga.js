import { UPDATE_WEIGHTAGE_FAILURE, UPDATE_WEIGHTAGE_REQUEST, UPDATE_WEIGHTAGE_SUCCESS } from './updateWeightageTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateWeightageRequest(payload) {
    try {
        const token = localStorage.getItem('token');
        let result = yield call(fetch, `https://fypbackendara-production.up.railway.app/updateWeightage/${payload.weightageId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_WEIGHTAGE_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_WEIGHTAGE_FAILURE, message: e.message })
    }
}

export function* updateWeightageSaga() {
    yield takeEvery(UPDATE_WEIGHTAGE_REQUEST, updateWeightageRequest)
}