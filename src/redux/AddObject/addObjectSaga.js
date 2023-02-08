import { ADD_OBJECT_FAILURE, ADD_OBJECT_REQUEST, ADD_OBJECT_SUCCESS } from './addObjectTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addObject(object) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addObject', object.object, { headers });
        yield put({ type: ADD_OBJECT_SUCCESS, message: "Object added successfully." })
    } catch (error) {
        yield put({ type: ADD_OBJECT_FAILURE, message: "Add Object operation failed." })
    }
}

export function* addObjectSaga() {
    yield takeEvery(ADD_OBJECT_REQUEST, addObject)
}