import { DELETE_ASSIGNED_COURSES_FAILURE, DELETE_ASSIGNED_COURSES_REQUEST, DELETE_ASSIGNED_COURSES_SUCCESS } from './deleteAssignedCoursesTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteAssignedCourses(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteAssignedCourses/${payload.query}`, { headers });
        yield put({ type: DELETE_ASSIGNED_COURSES_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ASSIGNED_COURSES_FAILURE, message: e.message})
    }
}

export function* deleteAssignedCoursesSaga() {
    yield takeEvery(DELETE_ASSIGNED_COURSES_REQUEST, deleteAssignedCourses)
}