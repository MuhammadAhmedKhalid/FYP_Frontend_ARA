import { put, takeEvery } from 'redux-saga/effects'
import { GET_INSTITUTE_TYPE_FAILURE, GET_INSTITUTE_TYPE_REQUEST, GET_INSTITUTE_TYPE_SUCCESS } from "./instituteTypes_Types"

function* getInstituteTypes() {
    try {
        let data = yield fetch('http://localhost:8080/get_institute_types')
        data = yield data.json();
        yield put({ type: GET_INSTITUTE_TYPE_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_INSTITUTE_TYPE_FAILURE, message: e.message })
    }
}

export function* instituteTypeSaga() {
    yield takeEvery(GET_INSTITUTE_TYPE_REQUEST, getInstituteTypes)
}