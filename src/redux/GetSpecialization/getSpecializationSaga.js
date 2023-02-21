import { GET_SPECIALIZATION_FAILURE, GET_SPECIALIZATION_REQUEST, GET_SPECIALIZATION_SUCCESS } from './getSpecializationTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getSpecializationRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result;
        if (data.query !== 0) {
            result = yield call(axios.get, `http://localhost:8080/getSpecializations/${data.query}`, { headers });
        }
        yield put({ type: GET_SPECIALIZATION_SUCCESS, data: result.data })
    } catch (e) {
        yield put({ type: GET_SPECIALIZATION_FAILURE, message: e.message })
    }
}

export function* getSpecializationSaga() {
    yield takeEvery(GET_SPECIALIZATION_REQUEST, getSpecializationRequest)
}