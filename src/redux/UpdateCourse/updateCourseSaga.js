import { UPDATE_COURSE_FAILURE, UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS } from './updateCourseTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateCourseRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `http://localhost:8080/updateCourse/${payload.course_id}`, {
        method: "PUT",
        body: JSON.stringify(payload.course),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_COURSE_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_COURSE_FAILURE, message: "Course already exists with this name in this department." })
    }
}

export function* updateCourseSaga() {
    yield takeEvery(UPDATE_COURSE_REQUEST, updateCourseRequest)
}