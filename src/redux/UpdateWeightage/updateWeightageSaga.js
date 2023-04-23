import { UPDATE_WEIGHTAGE_FAILURE, UPDATE_WEIGHTAGE_REQUEST, UPDATE_WEIGHTAGE_SUCCESS } from './updateWeightageTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* updateWeightageRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updateWeightage/${payload.weightageId}`, {
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