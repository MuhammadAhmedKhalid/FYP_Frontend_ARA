import { ADD_INSTITUTE_FAILURE, ADD_INSTITUTE_REQUEST, ADD_INSTITUTE_SUCCESS } from './instituteTypes'
import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addInstitute(institute) {
    try {
        axios.post('http://localhost:8080/add_institute', institute.institute)
        yield put({ type: ADD_INSTITUTE_SUCCESS, message: "Success" })
    } catch (e) {
        yield put({ type: ADD_INSTITUTE_FAILURE, message: e.message })
    }
}

export function* instituteSaga() {
    yield takeEvery(ADD_INSTITUTE_REQUEST, addInstitute)
}