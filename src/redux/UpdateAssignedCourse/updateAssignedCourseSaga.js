import { UPDATE_ASSIGNED_COURSE_FAILURE, UPDATE_ASSIGNED_COURSE_REQUEST, UPDATE_ASSIGNED_COURSE_SUCCESS } from './updateAssignedCourseTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* updateAssignedCourseRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.put, `http://localhost:8080/updateAssignedCourse/${payload.institute_id}/${payload.assignedCourseId}/${payload.faculty_id}`, { headers });
        yield put({ type: UPDATE_ASSIGNED_COURSE_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_ASSIGNED_COURSE_FAILURE, message: e.message })
    }
}

export function* updateAssignedCourseSaga() {
    yield takeEvery(UPDATE_ASSIGNED_COURSE_REQUEST, updateAssignedCourseRequest)
}