import { GET_FACULTY_FAILURE, GET_FACULTY_REQUEST, GET_FACULTY_SUCCESS } from './getFacultyTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getFacultyRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result;
        if (data.query !== 0) {
            result = yield call(axios.get, `http://localhost:8080/get-faculty/${data.query}`, { headers });
        }
        yield put({ type: GET_FACULTY_SUCCESS, data: result.data })
    } catch (e) {
        yield put({ type: GET_FACULTY_FAILURE, message: e.message })
    }
}

export function* getFacultySaga() {
    yield takeEvery(GET_FACULTY_REQUEST, getFacultyRequest)
}