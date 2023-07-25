import { ADD_ALLOCATE_FACULTY_FAILURE, ADD_ALLOCATE_FACULTY_REQUEST, ADD_ALLOCATE_FACULTY_SUCCESS } from './allocateFacultyTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addAllocateFaculty(obj) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/allocate', obj.obj, { headers });
        yield put({ type: ADD_ALLOCATE_FACULTY_SUCCESS, message: "Course allocated successfully." })
    } catch (error) {
        yield put({ type: ADD_ALLOCATE_FACULTY_FAILURE, message: "Operation unsuccessful." })
    }
}

export function* addAllocateFacultySaga() {
    yield takeEvery(ADD_ALLOCATE_FACULTY_REQUEST, addAllocateFaculty)
}