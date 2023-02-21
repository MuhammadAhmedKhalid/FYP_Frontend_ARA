import { ADD_POSITION_FAILURE, ADD_POSITION_REQUEST, ADD_POSITION_SUCCESS } from './addPositionTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addPosition(position) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addPosition', position.position, { headers });
        yield put({ type: ADD_POSITION_SUCCESS, message: "Position added successfully." })
    } catch (error) {
        yield put({ type: ADD_POSITION_FAILURE, message: "Add Position operation failed." })
    }
}

export function* addPositionSaga() {
    yield takeEvery(ADD_POSITION_REQUEST, addPosition)
}