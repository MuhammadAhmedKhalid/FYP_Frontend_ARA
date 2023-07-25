import { DELETE_ALLOCATED_FACULTY_FAILURE, DELETE_ALLOCATED_FACULTY_REQUEST, DELETE_ALLOCATED_FACULTY_SUCCESS } from './dltAllocatedFacultyTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* deleteAllocatedFaculty(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteAllocatedFaculty/${payload.query}`, { headers });
        yield put({ type: DELETE_ALLOCATED_FACULTY_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ALLOCATED_FACULTY_FAILURE, message: e.message})
    }
}

export function* deleteAllocatedFacultySaga() {
    yield takeEvery(DELETE_ALLOCATED_FACULTY_REQUEST, deleteAllocatedFaculty)
}