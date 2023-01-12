import { GET_OBJ_REQ_FAILURE, GET_OBJ_REQ_REQUEST, GET_OBJ_REQ_SUCCESS } from './getObjReqTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getObjReqRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/getObjectRequests', { headers });
        yield put({ type: GET_OBJ_REQ_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_OBJ_REQ_FAILURE, message: e.message })
    }
}

export function* getObjReqSaga() {
    yield takeEvery(GET_OBJ_REQ_REQUEST, getObjReqRequest)
}