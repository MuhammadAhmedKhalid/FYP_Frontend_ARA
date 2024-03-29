import { DELETE_DEPARTMENT_FAILURE, DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS } from './deleteDeptTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* deleteDepartment(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.delete, `https://fypbackendara-production.up.railway.app/deleteDepartment/${payload.query}`, { headers });
        yield put({ type: DELETE_DEPARTMENT_SUCCESS, message: result })
    } catch (e) {
        yield put({ type: DELETE_DEPARTMENT_FAILURE, message: e.message})
    }
}

export function* deleteDepartmentSaga() {
    yield takeEvery(DELETE_DEPARTMENT_REQUEST, deleteDepartment)
}