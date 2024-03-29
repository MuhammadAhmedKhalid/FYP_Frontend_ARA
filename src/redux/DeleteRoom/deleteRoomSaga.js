import { DELETE_ROOM_FAILURE, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS } from './deleteRoomTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteRoom(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteRoom/${payload.query}`, { headers });
        yield put({ type: DELETE_ROOM_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ROOM_FAILURE, message: e.message})
    }
}

export function* deleteRoomSaga() {
    yield takeEvery(DELETE_ROOM_REQUEST, deleteRoom)
}