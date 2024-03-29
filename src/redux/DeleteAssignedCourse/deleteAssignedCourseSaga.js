import { DELETE_ASSIGNED_COURSE_FAILURE, DELETE_ASSIGNED_COURSE_REQUEST, DELETE_ASSIGNED_COURSE_SUCCESS } from './deleteAssignedCourseTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteAssignedCourse(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteAssignedCourse/${data.query}`, { headers });
        yield put({ type: DELETE_ASSIGNED_COURSE_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ASSIGNED_COURSE_FAILURE, message: e.message})
    }
}

export function* deleteAssignedCourseSaga() {
    yield takeEvery(DELETE_ASSIGNED_COURSE_REQUEST, deleteAssignedCourse)
}