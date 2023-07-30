import { ASSIGNED_COURSES_FOR_TABLE_FAILURE, ASSIGNED_COURSES_FOR_TABLE_REQUEST, ASSIGNED_COURSES_FOR_TABLE_SUCCESS } from './assignedCoursesForTableTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* assignedCoursesForTableRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/assignedCoursesForTable/${data.query}`, { headers });
            yield put({ type: ASSIGNED_COURSES_FOR_TABLE_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: ASSIGNED_COURSES_FOR_TABLE_FAILURE, message: e.message })
    }
}

export function* assignedCoursesForTableSaga() {
    yield takeEvery(ASSIGNED_COURSES_FOR_TABLE_REQUEST, assignedCoursesForTableRequest)
}