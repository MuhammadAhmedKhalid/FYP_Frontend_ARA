import { DELETE_POSITION_FAILURE, DELETE_POSITION_REQUEST, DELETE_POSITION_SUCCESS } from './deletePositionTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deletePosition(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deletePosition/${payload.query}`, { headers });
        yield put({ type: DELETE_POSITION_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_POSITION_FAILURE, message: e.message})
    }
}

export function* deletePositionSaga() {
    yield takeEvery(DELETE_POSITION_REQUEST, deletePosition)
}