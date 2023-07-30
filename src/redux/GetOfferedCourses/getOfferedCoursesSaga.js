import { GET_OFFERED_COURSES_FAILURE, GET_OFFERED_COURSES_REQUEST, GET_OFFERED_COURSES_SUCCESS } from './getOfferedCoursesTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* getOfferedCoursesRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/offeredCourses/${data.query}`, { headers });
            yield put({ type: GET_OFFERED_COURSES_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_OFFERED_COURSES_FAILURE, message: e.message })
    }
}

export function* getOfferedCoursesSaga() {
    yield takeEvery(GET_OFFERED_COURSES_REQUEST, getOfferedCoursesRequest)
}