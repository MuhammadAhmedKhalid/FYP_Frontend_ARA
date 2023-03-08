import { GET_BATCHES_FAILURE, GET_BATCHES_REQUEST, GET_BATCHES_SUCCESS } from './getBatchesTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getBatchesRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `http://localhost:8080/batches/${data.query}`, { headers });
            yield put({ type: GET_BATCHES_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_BATCHES_FAILURE, message: e.message })
    }
}

export function* getBatchesSaga() {
    yield takeEvery(GET_BATCHES_REQUEST, getBatchesRequest)
}