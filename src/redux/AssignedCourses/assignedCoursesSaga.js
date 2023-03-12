import { ASSIGNED_COURSES_FAILURE, ASSIGNED_COURSES_REQUEST, ASSIGNED_COURSES_SUCCESS } from './assignedCoursesTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* assignedCoursesRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `http://localhost:8080/assignedCourses/${data.query}`, { headers });
            yield put({ type: ASSIGNED_COURSES_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: ASSIGNED_COURSES_FAILURE, message: e.message })
    }
}

export function* assignedCoursesSaga() {
    yield takeEvery(ASSIGNED_COURSES_REQUEST, assignedCoursesRequest)
}