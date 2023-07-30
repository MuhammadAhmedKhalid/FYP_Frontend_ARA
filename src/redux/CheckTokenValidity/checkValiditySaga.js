import { CHECK_VALIDITY_FAILURE, CHECK_VALIDITY_REQUEST, CHECK_VALIDITY_SUCCESS } from './checkValidityTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* checkTokenRequest(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.get, 'https://fypbackendara-production.up.railway.app/checkTokenValidity', { headers });
        yield put({ type: CHECK_VALIDITY_SUCCESS })
    } catch (e) {
        yield put({ type: CHECK_VALIDITY_FAILURE, message: e.message })
    }
}

export function* checkTokenSaga() {
    yield takeEvery(CHECK_VALIDITY_REQUEST, checkTokenRequest)
}