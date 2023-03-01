import { ADD_ROOM_FAILURE, ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS } from './addRoomTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addRoom(room) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/add_room', room.room, { headers });
        yield put({ type: ADD_ROOM_SUCCESS, message: "Room added successfully." })
    } catch (error) {
        yield put({ type: ADD_ROOM_FAILURE, message: "Add Room operation failed." })
    }
}

export function* addRoomSaga() {
    yield takeEvery(ADD_ROOM_REQUEST, addRoom)
}