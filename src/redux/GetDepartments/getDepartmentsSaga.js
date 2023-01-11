import { GET_DEPARTEMNTS_FAILURE, GET_DEPARTEMNTS_REQUEST, GET_DEPARTEMNTS_SUCCESS } from './getDepartmentsTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getDepartmentsRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/departments', { headers });
        yield put({ type: GET_DEPARTEMNTS_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_DEPARTEMNTS_FAILURE, message: e.message })
    }
}

export function* getDepartmentsSaga() {
    yield takeEvery(GET_DEPARTEMNTS_REQUEST, getDepartmentsRequest)
}