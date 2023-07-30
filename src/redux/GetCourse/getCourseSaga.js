import { GET_COURSE_FAILURE, GET_COURSE_REQUEST, GET_COURSE_SUCCESS } from './getCourseTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getCourseRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result;
        if (data.query !== 0) {
            result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/getCourses/${data.query}`, { headers });
        }
        yield put({ type: GET_COURSE_SUCCESS, data: result.data })
    } catch (e) {
        yield put({ type: GET_COURSE_FAILURE, message: e.message })
    }
}

export function* getCourseSaga() {
    yield takeEvery(GET_COURSE_REQUEST, getCourseRequest)
}