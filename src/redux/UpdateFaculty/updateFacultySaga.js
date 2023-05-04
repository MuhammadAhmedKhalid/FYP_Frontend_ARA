import { UPDATE_FACULTY_FAILURE, UPDATE_FACULTY_REQUEST, UPDATE_FACULTY_SUCCESS } from './updateFacultyTypes'
import { put, takeEvery, call } from 'redux-saga/effects'

function* updateFacultyRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `http://localhost:8080/updateFaculty/${payload.faculty_id}`, {
        method: "PUT",
        body: JSON.stringify(payload.faculty),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_FACULTY_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_FACULTY_FAILURE, message: "Operation failed." })
    }
}

export function* updateFacultySaga() {
    yield takeEvery(UPDATE_FACULTY_REQUEST, updateFacultyRequest)
}