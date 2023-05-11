import { UPDATE_ASSIGNED_COURSE_FAILURE, UPDATE_ASSIGNED_COURSE_REQUEST, UPDATE_ASSIGNED_COURSE_SUCCESS } from './updateAssignedCourseTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* updateAssignedCourseRequest(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.put, `http://localhost:8080/updateAssignedCourse/${payload.faculty_id}`, payload, { headers });
        yield put({ type: UPDATE_ASSIGNED_COURSE_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_ASSIGNED_COURSE_FAILURE, message: e.message })
    }
}

export function* updateAssignedCourseSaga() {
    yield takeEvery(UPDATE_ASSIGNED_COURSE_REQUEST, updateAssignedCourseRequest)
}