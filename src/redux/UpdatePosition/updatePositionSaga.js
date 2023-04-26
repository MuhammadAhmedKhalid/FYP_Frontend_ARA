import { UPDATE_POSITION_FAILURE, UPDATE_POSITION_REQUEST, UPDATE_POSITION_SUCCESS } from './updatePositionTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updatePositionRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updatePosition/${payload.position_id}`, {
            method: "PUT",
            body: payload.position_name,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_POSITION_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_POSITION_FAILURE, message: e.message })
    }
}

export function* updatePositionSaga() {
    yield takeEvery(UPDATE_POSITION_REQUEST, updatePositionRequest)
}