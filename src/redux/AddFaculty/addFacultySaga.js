import { ADD_FACULTY_FAILURE, ADD_FACULTY_REQUEST, ADD_FACULTY_SUCCESS } from './addFacultyTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addFaculty(faculty) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/create-faculty', faculty.faculty, { headers });
        yield put({ type: ADD_FACULTY_SUCCESS, message: "Faculty added successfully." })
    } catch (error) {
        yield put({ type: ADD_FACULTY_FAILURE, message: error.response.data })
    }
}

export function* addFacultySaga() {
    yield takeEvery(ADD_FACULTY_REQUEST, addFaculty)
}