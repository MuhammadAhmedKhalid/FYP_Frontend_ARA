import { UPDATE_OFFERED_COURSE_FAILURE, UPDATE_OFFERED_COURSE_REQUEST, UPDATE_OFFERED_COURSE_SUCCESS } from './updateOfferedCourseTypes'
import { put, takeEvery, call } from 'redux-saga/effects'

function* updateOfferedCourseRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `https://fypbackendara-production.up.railway.app/updateOfferedCourse/${payload.offerCourseId}`, {
        method: "PUT",
        body: JSON.stringify(payload.offerCourse),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    const data = yield result.text();
    if(result.status === 200){
        yield put({ type: UPDATE_OFFERED_COURSE_SUCCESS, message: data })
    }else{
        yield put({ type: UPDATE_OFFERED_COURSE_FAILURE, message: "Course already offered." })
    }
}

export function* updateOfferedCourseSaga() {
    yield takeEvery(UPDATE_OFFERED_COURSE_REQUEST, updateOfferedCourseRequest)
}