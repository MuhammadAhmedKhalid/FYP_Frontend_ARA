import { GET_FACULTY_FAILURE, GET_FACULTY_REQUEST, GET_FACULTY_SUCCESS } from './getFacultyTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getFacultyRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.get, `http://localhost:8080/get-faculty/${data.query}`, { headers });
        yield put({ type: GET_FACULTY_SUCCESS, data: result.data })
    } catch (e) {
        yield put({ type: GET_FACULTY_FAILURE, message: e.message })
    }
}

export function* getFacultySaga() {
    yield takeEvery(GET_FACULTY_REQUEST, getFacultyRequest)
}