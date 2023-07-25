import { UPDATE_ALLOCATED_FACULTY_FAILURE, UPDATE_ALLOCATED_FACULTY_REQUEST, UPDATE_ALLOCATED_FACULTY_SUCCESS } from './updAllocatedFacultyTypes'
import { put, takeEvery, call } from 'redux-saga/effects'

function* updateAllocatedFacultyRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `http://localhost:8080/updateAllocatedFaculty/${payload.allocateFacultyId}`, {
        method: "PUT",
        body: JSON.stringify(payload.allocateFaculty),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    const data = yield result.text();
    if(result.status === 200){
        yield put({ type: UPDATE_ALLOCATED_FACULTY_SUCCESS, message: data })
    }else{
        yield put({ type: UPDATE_ALLOCATED_FACULTY_FAILURE, message: "Operation unsuccessful." })
    }
}

export function* updateAllocatedFacultySaga() {
    yield takeEvery(UPDATE_ALLOCATED_FACULTY_REQUEST, updateAllocatedFacultyRequest)
}