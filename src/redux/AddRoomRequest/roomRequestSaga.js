import { ADD_ROOM_REQ_FAILURE, ADD_ROOM_REQ_REQUEST, ADD_ROOM_REQ_SUCCESS } from './roomRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* addRoomRequest(room) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addRoomRequest', room.room, { headers });
        yield put({ type: ADD_ROOM_REQ_SUCCESS, message: "Room request added successfully." })
    } catch (error) {
        yield put({ type: ADD_ROOM_REQ_FAILURE, message: "Add room request operation failed." })
    }
}

export function* addRoomRequestSaga() {
    yield takeEvery(ADD_ROOM_REQ_REQUEST, addRoomRequest)
}