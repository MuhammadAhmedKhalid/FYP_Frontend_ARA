import { ADD_OBJ_REQ_FAILURE, ADD_OBJ_REQ_REQUEST, ADD_OBJ_REQ_SUCCESS } from './addObjRequestTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addObjRequest(obj) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addObjectRequest', obj.obj, { headers });
        yield put({ type: ADD_OBJ_REQ_SUCCESS, message: "Object request added successfully." })
    } catch (error) {
        yield put({ type: ADD_OBJ_REQ_FAILURE, message: "Requested quantity is greater than the available quantity." })
    }
}

export function* addObjRequestSaga() {
    yield takeEvery(ADD_OBJ_REQ_REQUEST, addObjRequest)
}