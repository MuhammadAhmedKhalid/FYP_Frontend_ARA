import { ADD_OBJ_REQ_FAILURE, ADD_OBJ_REQ_REQUEST, ADD_OBJ_REQ_SUCCESS } from './addObjRequestTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* addObjRequest(obj) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.post, 'http://localhost:8080/addObjectRequest', obj.obj, { headers });
        yield put({ type: ADD_OBJ_REQ_SUCCESS, message: "Object request added successfully." })
    } catch (error) {
        yield put({ type: ADD_OBJ_REQ_FAILURE, message: "Add object request operation failed." })
    }
}

export function* addObjRequestSaga() {
    yield takeEvery(ADD_OBJ_REQ_REQUEST, addObjRequest)
}