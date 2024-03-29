import { ASSIGN_COURSE_FAILURE, ASSIGN_COURSE_REQUEST, ASSIGN_COURSE_SUCCESS } from './assignCourseTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* assignCourse(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/assignCourse', payload, { headers });
        yield put({ type: ASSIGN_COURSE_SUCCESS, message: "Course assigned successfully." })
    } catch (error) {
        yield put({ type: ASSIGN_COURSE_FAILURE, message: error.response.data })
    }
}

export function* assignCourseSaga() {
    yield takeEvery(ASSIGN_COURSE_REQUEST, assignCourse)
}