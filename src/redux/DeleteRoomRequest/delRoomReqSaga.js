import { DELETE_ROOM_REQ_FAILURE, DELETE_ROOM_REQ_REQUEST, DELETE_ROOM_REQ_SUCCESS } from './delRoomReqTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteRoomRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteRoomRequest/${data.query}`, { headers });
        yield put({ type: DELETE_ROOM_REQ_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ROOM_REQ_FAILURE, message: e.message})
    }
}

export function* deleteRoomRequestSaga() {
    yield takeEvery(DELETE_ROOM_REQ_REQUEST, deleteRoomRequest)
}