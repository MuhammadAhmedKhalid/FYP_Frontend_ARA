import { GET_OBJECTS_FAILURE, GET_OBJECTS_REQUEST, GET_OBJECTS_SUCCESS } from './getObjectsTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getObjectsRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `http://localhost:8080/objects/${data.query}`, { headers });
            yield put({ type: GET_OBJECTS_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_OBJECTS_FAILURE, message: e.message })
    }
}

export function* getObjectsSaga() {
    yield takeEvery(GET_OBJECTS_REQUEST, getObjectsRequest)
}