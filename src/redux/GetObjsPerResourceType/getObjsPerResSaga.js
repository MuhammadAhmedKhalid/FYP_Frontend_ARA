import { GET_OBJS_PER_RES_FAILURE, GET_OBJS_PER_RES_REQUEST, GET_OBJS_PER_RES_SUCCESS } from './getObjsPerResTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getObjectsPerResRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/objectsPerResourceType/${data.query}`, { headers });
            yield put({ type: GET_OBJS_PER_RES_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_OBJS_PER_RES_FAILURE, message: e.message })
    }
}

export function* getObjectsPerResSaga() {
    yield takeEvery(GET_OBJS_PER_RES_REQUEST, getObjectsPerResRequest)
}