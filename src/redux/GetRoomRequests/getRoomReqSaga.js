import { GET_ROOM_REQ_FAILURE, GET_ROOM_REQ_REQUEST, GET_ROOM_REQ_SUCCESS } from './getRoomReqTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getRoomRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/getRoomRequests', { headers });
        yield put({ type: GET_ROOM_REQ_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_ROOM_REQ_FAILURE, message: e.message })
    }
}

export function* getRoomReqSaga() {
    yield takeEvery(GET_ROOM_REQ_REQUEST, getRoomRequest)
}