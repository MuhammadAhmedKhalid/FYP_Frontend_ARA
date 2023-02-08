import { ADD_INSTITUTE_FAILURE, ADD_INSTITUTE_REQUEST, ADD_INSTITUTE_SUCCESS } from './instituteTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addInstitute(institute) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.post, 'http://localhost:8080/add_institute', institute.institute, { headers });
        yield put({ type: ADD_INSTITUTE_SUCCESS, message: "Institute added successfully.", response })
    } catch (error) {
        yield put({ type: ADD_INSTITUTE_FAILURE, message: "Add institute operation failed." })
    }
}

export function* instituteSaga() {
    yield takeEvery(ADD_INSTITUTE_REQUEST, addInstitute)
}