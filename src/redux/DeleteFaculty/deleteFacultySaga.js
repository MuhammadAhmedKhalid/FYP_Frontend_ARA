import { DELETE_FACULTY_FAILURE, DELETE_FACULTY_REQUEST, DELETE_FACULTY_SUCCESS } from './deleteFacultyTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteFaculty(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteFaculty/${payload.query}`, { headers });
        yield put({ type: DELETE_FACULTY_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_FACULTY_FAILURE, message: e.message})
    }
}

export function* deleteFacultySaga() {
    yield takeEvery(DELETE_FACULTY_REQUEST, deleteFaculty)
}