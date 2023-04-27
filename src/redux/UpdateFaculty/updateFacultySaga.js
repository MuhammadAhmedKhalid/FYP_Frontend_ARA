import { UPDATE_FACULTY_FAILURE, UPDATE_FACULTY_REQUEST, UPDATE_FACULTY_SUCCESS } from './updateFacultyTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateFacultyRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updateFaculty/${payload.faculty_id}`, {
            method: "PUT",
            body: payload,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_FACULTY_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_FACULTY_FAILURE, message: e.message })
    }
}

export function* updateFacultySaga() {
    yield takeEvery(UPDATE_FACULTY_REQUEST, updateFacultyRequest)
}