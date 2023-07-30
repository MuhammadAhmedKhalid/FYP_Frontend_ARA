import { ADD_ROOM_REQ_FAILURE, ADD_ROOM_REQ_REQUEST, ADD_ROOM_REQ_SUCCESS } from './roomRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* addRoomRequest(room) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addRoomRequest', room.room, { headers });
        yield put({ type: ADD_ROOM_REQ_SUCCESS, message: "Room request added successfully." })
    } catch (error) {
        yield put({ type: ADD_ROOM_REQ_FAILURE, message: "Add room request operation failed." })
    }
}

export function* addRoomRequestSaga() {
    yield takeEvery(ADD_ROOM_REQ_REQUEST, addRoomRequest)
}