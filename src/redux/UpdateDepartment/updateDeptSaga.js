import { UPDATE_DEPARTMENT_FAILURE, UPDATE_DEPARTMENT_REQUEST, UPDATE_DEPARTMENT_SUCCESS } from './updateDeptTypes'
import { put, takeEvery, call } from 'redux-saga/effects'

function* updateDepartmentRequest(payload) {
    const token = localStorage.getItem('token');
    let result = yield call(fetch, `http://localhost:8080/updateDepartment/${payload.department_id}`, {
        method: "PUT",
        body: JSON.stringify(payload.dept),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    if(result.status === 200){
        yield put({ type: UPDATE_DEPARTMENT_SUCCESS, result })
    }else{
        yield put({ type: UPDATE_DEPARTMENT_FAILURE, message: "Department already exists with this name." })
    }
}

export function* updateDepartmentSaga() {
    yield takeEvery(UPDATE_DEPARTMENT_REQUEST, updateDepartmentRequest)
}