import { GET_DEPARTEMNTS_FAILURE, GET_DEPARTEMNTS_REQUEST, GET_DEPARTEMNTS_SUCCESS } from './getDepartmentsTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* getDepartmentsRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/departments/${data.query}`, { headers });
            yield put({ type: GET_DEPARTEMNTS_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_DEPARTEMNTS_FAILURE, message: e.message })
    }
}

export function* getDepartmentsSaga() {
    yield takeEvery(GET_DEPARTEMNTS_REQUEST, getDepartmentsRequest)
}