import { DELETE_OFFERED_COURSE_FAILURE, DELETE_OFFERED_COURSE_REQUEST, DELETE_OFFERED_COURSE_SUCCESS } from './deleteOfferedCourseTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* deleteOfferedCourse(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteOfferedCourse/${payload.query}`, { headers });
        yield put({ type: DELETE_OFFERED_COURSE_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_OFFERED_COURSE_FAILURE, message: e.message})
    }
}

export function* deleteOfferedCourseSaga() {
    yield takeEvery(DELETE_OFFERED_COURSE_REQUEST, deleteOfferedCourse)
}