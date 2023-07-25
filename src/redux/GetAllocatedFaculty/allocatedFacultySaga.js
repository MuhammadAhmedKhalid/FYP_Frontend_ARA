import { GET_ALLOCATED_FACULTY_FAILURE, GET_ALLOCATED_FACULTY_REQUEST, GET_ALLOCATED_FACULTY_SUCCESS } from './allocatedFacultyTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* getAllocatedFacultyRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `http://localhost:8080/allocatedFaculty/${data.query}`, { headers });
            yield put({ type: GET_ALLOCATED_FACULTY_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_ALLOCATED_FACULTY_FAILURE, message: e.message })
    }
}

export function* getAllocatedFacultySaga() {
    yield takeEvery(GET_ALLOCATED_FACULTY_REQUEST, getAllocatedFacultyRequest)
}