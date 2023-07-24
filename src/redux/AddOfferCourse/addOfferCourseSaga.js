import { ADD_OFFER_COURSE_FAILURE, ADD_OFFER_COURSE_REQUEST, ADD_OFFER_COURSE_SUCCESS } from './addOfferCourseTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addOfferCourse(obj) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/offerCourse', obj.obj, { headers });
        yield put({ type: ADD_OFFER_COURSE_SUCCESS, message: "Offer course added successfully." })
    } catch (error) {
        yield put({ type: ADD_OFFER_COURSE_FAILURE, message: "Course already offered." })
    }
}

export function* addOfferCourseSaga() {
    yield takeEvery(ADD_OFFER_COURSE_REQUEST, addOfferCourse)
}