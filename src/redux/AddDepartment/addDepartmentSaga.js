import { ADD_DEPARTMENT_FAILURE, ADD_DEPARTMENT_REQUEST, ADD_DEPARTMENT_SUCCESS } from './addDepartmentTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addDepartment(department) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/add_department', department.department, { headers });
        yield put({ type: ADD_DEPARTMENT_SUCCESS, message: "Department added successfully." })
    } catch (error) {
        yield put({ type: ADD_DEPARTMENT_FAILURE, message: "Add Department operation failed." })
    }
}

export function* addDepartmentSaga() {
    yield takeEvery(ADD_DEPARTMENT_REQUEST, addDepartment)
}