import { GET_DEPARTEMNTS_FAILURE, GET_DEPARTEMNTS_REQUEST, GET_DEPARTEMNTS_SUCCESS } from './getDepartmentsTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getDepartmentsRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `http://localhost:8080/departments/${data.query}`, { headers });
            yield put({ type: GET_DEPARTEMNTS_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_DEPARTEMNTS_FAILURE, message: e.message })
    }
}

export function* getDepartmentsSaga() {
    yield takeEvery(GET_DEPARTEMNTS_REQUEST, getDepartmentsRequest)
}