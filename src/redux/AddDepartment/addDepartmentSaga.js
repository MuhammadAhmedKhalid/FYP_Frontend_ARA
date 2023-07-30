import { ADD_DEPARTMENT_FAILURE, ADD_DEPARTMENT_REQUEST, ADD_DEPARTMENT_SUCCESS } from './addDepartmentTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addDepartment(department) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/add_department', department.department, { headers });
        yield put({ type: ADD_DEPARTMENT_SUCCESS, message: "Department added successfully." })
    } catch (error) {
        yield put({ type: ADD_DEPARTMENT_FAILURE, message: error.response.data })
    }
}

export function* addDepartmentSaga() {
    yield takeEvery(ADD_DEPARTMENT_REQUEST, addDepartment)
}