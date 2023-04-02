import { JACCARD_FAILURE, JACCARD_REQUEST, JACCARD_SUCCESS } from './jaccardTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* jaccardRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.post, 'http://localhost:8080/jaccard', data.facultyList, { headers });
        yield put({ type: JACCARD_SUCCESS, result })
    } catch (e) {
        yield put({ type: JACCARD_FAILURE, message: e.message })
    }
}

export function* jaccardSaga() {
    yield takeEvery(JACCARD_REQUEST, jaccardRequest)
}