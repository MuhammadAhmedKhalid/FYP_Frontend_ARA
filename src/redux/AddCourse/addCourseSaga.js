import { ADD_COURSE_FAILURE, ADD_COURSE_REQUEST, ADD_COURSE_SUCCESS } from './addCourseTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addCourse(course) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addCourse', course.course, { headers });
        yield put({ type: ADD_COURSE_SUCCESS, message: "Course added successfully." })
    } catch (error) {
        yield put({ type: ADD_COURSE_FAILURE, message: error.response.data })
    }
}

export function* addCourseSaga() {
    yield takeEvery(ADD_COURSE_REQUEST, addCourse)
}