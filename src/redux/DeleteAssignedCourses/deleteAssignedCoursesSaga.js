import { DELETE_ASSIGNED_COURSES_FAILURE, DELETE_ASSIGNED_COURSES_REQUEST, DELETE_ASSIGNED_COURSES_SUCCESS } from './deleteAssignedCoursesTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteAssignedCourses(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteAssignedCourses/${payload.query}`, { headers });
        yield put({ type: DELETE_ASSIGNED_COURSES_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_ASSIGNED_COURSES_FAILURE, message: e.message})
    }
}

export function* deleteAssignedCoursesSaga() {
    yield takeEvery(DELETE_ASSIGNED_COURSES_REQUEST, deleteAssignedCourses)
}