import { DELETE_OBJ_REQ_FAILURE, DELETE_OBJ_REQ_REQUEST, DELETE_OBJ_REQ_SUCCESS } from './delObjReqTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteObjRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteObjectRequest/${data.query}`, { headers });
        yield put({ type: DELETE_OBJ_REQ_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_OBJ_REQ_FAILURE, message: e.message})
    }
}

export function* deleteObjRequestSaga() {
    yield takeEvery(DELETE_OBJ_REQ_REQUEST, deleteObjRequest)
}