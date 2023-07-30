import { ADD_OBJECT_FAILURE, ADD_OBJECT_REQUEST, ADD_OBJECT_SUCCESS } from './addObjectTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addObject(object) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addObject', object.object, { headers });
        yield put({ type: ADD_OBJECT_SUCCESS, message: "Object added successfully." })
    } catch (error) {
        yield put({ type: ADD_OBJECT_FAILURE, message: error.response.data })
    }
}

export function* addObjectSaga() {
    yield takeEvery(ADD_OBJECT_REQUEST, addObject)
}