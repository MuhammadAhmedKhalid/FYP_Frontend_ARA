import { UPDATE_COURSE_FAILURE, UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS } from './updateCourseTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateCourseRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updateCourse/${payload.course_id}/${payload.department_id}`, {
            method: "PUT",
            body: payload.course_name,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_COURSE_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_COURSE_FAILURE, message: e.message })
    }
}

export function* updateCourseSaga() {
    yield takeEvery(UPDATE_COURSE_REQUEST, updateCourseRequest)
}