import { UPDATE_ROOM_FAILURE, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS } from './updateRoomTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateRoomRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updateRoom/${payload.room_id}/${payload.department_id}`, {
            method: "PUT",
            body: payload.room_name,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_ROOM_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_ROOM_FAILURE, message: e.message })
    }
}

export function* updateRoomSaga() {
    yield takeEvery(UPDATE_ROOM_REQUEST, updateRoomRequest)
}