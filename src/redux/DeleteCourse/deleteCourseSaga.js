import { DELETE_COURSE_FAILURE, DELETE_COURSE_REQUEST, DELETE_COURSE_SUCCESS } from './deleteCourseTypes'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'

function* deleteCourse(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `http://localhost:8080/deleteCourse/${payload.query}`, { headers });
        yield put({ type: DELETE_COURSE_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_COURSE_FAILURE, message: e.message})
    }
}

export function* deleteCourseSaga() {
    yield takeEvery(DELETE_COURSE_REQUEST, deleteCourse)
}