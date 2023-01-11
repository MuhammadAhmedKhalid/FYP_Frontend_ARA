import { GET_ROOMS_FAILURE, GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS } from './getRoomsTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getRoomsRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/rooms', { headers });
        yield put({ type: GET_ROOMS_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_ROOMS_FAILURE, message: e.message })
    }
}

export function* getRoomsSaga() {
    yield takeEvery(GET_ROOMS_REQUEST, getRoomsRequest)
}