import { UPDATE_POSITION_FAILURE, UPDATE_POSITION_REQUEST, UPDATE_POSITION_SUCCESS } from './updatePositionTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updatePositionRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `http://localhost:8080/updatePosition/${payload.position_id}`, {
        method: "PUT",
        body: payload.position_name,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_POSITION_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_POSITION_FAILURE, message: "Position already exists with this name." })
    }
}

export function* updatePositionSaga() {
    yield takeEvery(UPDATE_POSITION_REQUEST, updatePositionRequest)
}