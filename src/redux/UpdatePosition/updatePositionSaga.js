import { UPDATE_POSITION_FAILURE, UPDATE_POSITION_REQUEST, UPDATE_POSITION_SUCCESS } from './updatePositionTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updatePositionRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `https://fypbackendara-production.up.railway.app/updatePosition/${payload.position_id}`, {
        method: "PUT",
        body: JSON.stringify(payload.position),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
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