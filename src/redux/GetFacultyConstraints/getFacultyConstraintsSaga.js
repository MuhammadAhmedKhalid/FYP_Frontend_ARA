import { GET_FACULTY_CONSTRAINTS_FAILURE, GET_FACULTY_CONSTRAINTS_REQUEST, GET_FACULTY_CONSTRAINTS_SUCCESS } from './getFacultyConstraintsTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* getFacultyConstraintsRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result;
        if (data.query !== 0) {
            result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/getFacultyConstraints/${data.query}`, { headers });
        }
        yield put({ type: GET_FACULTY_CONSTRAINTS_SUCCESS, data: result.data })
    } catch (e) {
        yield put({ type: GET_FACULTY_CONSTRAINTS_FAILURE, message: e.message })
    }
}

export function* getFacultyConstraintsSaga() {
    yield takeEvery(GET_FACULTY_CONSTRAINTS_REQUEST, getFacultyConstraintsRequest)
}