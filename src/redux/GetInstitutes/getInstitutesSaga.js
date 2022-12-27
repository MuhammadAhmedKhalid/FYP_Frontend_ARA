import { GET_INSTITUTES_FAILURE, GET_INSTITUTES_REQUEST, GET_INSTITUTES_SUCCESS } from './getInstitutesTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getInstituteRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/get_institutes', { headers });
        yield put({ type: GET_INSTITUTES_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_INSTITUTES_FAILURE, message: e.message })
    }
}

export function* getInstitutesSaga() {
    yield takeEvery(GET_INSTITUTES_REQUEST, getInstituteRequest)
}