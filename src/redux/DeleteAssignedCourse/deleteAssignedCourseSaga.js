import { DELETE_ASSIGNED_COURSE_FAILURE, DELETE_ASSIGNED_COURSE_REQUEST, DELETE_ASSIGNED_COURSE_SUCCESS } from './deleteAssignedCourseTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteAssignedCourse(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteAssignedCourse/${data.query}`, { headers });
        yield put({ type: DELETE_ASSIGNED_COURSE_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ASSIGNED_COURSE_FAILURE, message: e.message})
    }
}

export function* deleteAssignedCourseSaga() {
    yield takeEvery(DELETE_ASSIGNED_COURSE_REQUEST, deleteAssignedCourse)
}