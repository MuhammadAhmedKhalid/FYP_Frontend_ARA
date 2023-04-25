import { UPDATE_DEPARTMENT_FAILURE, UPDATE_DEPARTMENT_REQUEST, UPDATE_DEPARTMENT_SUCCESS } from './updateDeptTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'

function* updateDepartmentRequest(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        let result = yield call(fetch, `http://localhost:8080/updateDepartment/${payload.department_id}`, {
            method: "PUT",
            body: payload.department_name,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        yield put({ type: UPDATE_DEPARTMENT_SUCCESS, result })
    } catch (e) {
        yield put({ type: UPDATE_DEPARTMENT_FAILURE, message: e.message })
    }
}

export function* updateDepartmentSaga() {
    yield takeEvery(UPDATE_DEPARTMENT_REQUEST, updateDepartmentRequest)
}