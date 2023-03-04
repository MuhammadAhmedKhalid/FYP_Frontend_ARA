import { GET_OBJS_PER_RES_FAILURE, GET_OBJS_PER_RES_REQUEST, GET_OBJS_PER_RES_SUCCESS } from './getObjsPerResTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getObjectsPerResRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `http://localhost:8080/objectsPerResourceType/${data.query}`, { headers });
            yield put({ type: GET_OBJS_PER_RES_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_OBJS_PER_RES_FAILURE, message: e.message })
    }
}

export function* getObjectsPerResSaga() {
    yield takeEvery(GET_OBJS_PER_RES_REQUEST, getObjectsPerResRequest)
}