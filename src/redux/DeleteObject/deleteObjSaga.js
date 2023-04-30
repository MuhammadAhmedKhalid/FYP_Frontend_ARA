import { DELETE_OBJ_FAILURE, DELETE_OBJ_REQUEST, DELETE_OBJ_SUCCESS } from './deleteObjTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteObj(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteObject/${payload.query}`, { headers });
        yield put({ type: DELETE_OBJ_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_OBJ_FAILURE, message: e.message})
    }
}

export function* deleteObjSaga() {
    yield takeEvery(DELETE_OBJ_REQUEST, deleteObj)
}