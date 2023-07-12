import { UPDATE_ROOM_FAILURE, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS } from './updateRoomTypes'
import { put, takeEvery, call } from 'redux-saga/effects'

function* updateRoomRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `http://localhost:8080/updateRoom/${payload.room_id}`, {
        method: "PUT",
        body: JSON.stringify(payload.room),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_ROOM_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_ROOM_FAILURE, message: "Room already exists." })
    }
}

export function* updateRoomSaga() {
    yield takeEvery(UPDATE_ROOM_REQUEST, updateRoomRequest)
}