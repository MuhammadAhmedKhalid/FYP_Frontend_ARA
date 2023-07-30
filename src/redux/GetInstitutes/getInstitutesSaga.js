import { GET_INSTITUTES_FAILURE, GET_INSTITUTES_REQUEST, GET_INSTITUTES_SUCCESS } from './getInstitutesTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getInstituteRequest() {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'https://fypbackendara-production.up.railway.app/get_institutes', { headers });
        yield put({ type: GET_INSTITUTES_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_INSTITUTES_FAILURE, message: e.message })
    }
}

export function* getInstitutesSaga() {
    yield takeEvery(GET_INSTITUTES_REQUEST, getInstituteRequest)
}