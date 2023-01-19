import { GET_OBJECTS_FAILURE, GET_OBJECTS_REQUEST, GET_OBJECTS_SUCCESS } from './getObjectsTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getObjectsRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/objects', { headers });
        yield put({ type: GET_OBJECTS_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_OBJECTS_FAILURE, message: e.message })
    }
}

export function* getObjectsSaga() {
    yield takeEvery(GET_OBJECTS_REQUEST, getObjectsRequest)
}