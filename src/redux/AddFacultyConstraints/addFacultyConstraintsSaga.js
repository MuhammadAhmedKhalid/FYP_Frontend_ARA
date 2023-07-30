import { ADD_FACULTY_CONSTRAINTS_FAILURE, ADD_FACULTY_CONSTRAINTS_REQUEST, ADD_FACULTY_CONSTRAINTS_SUCCESS } from './addFacultyConstraintsTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addFacultyConstraints(constraints) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addFacultyConstraints', constraints.constraints, { headers });
        yield put({ type: ADD_FACULTY_CONSTRAINTS_SUCCESS, message: "Faculty constraints added successfully." })
    } catch (error) {
        yield put({ type: ADD_FACULTY_CONSTRAINTS_FAILURE, message: error.response.data })
    }
}

export function* addFacultyConstraintsSaga() {
    yield takeEvery(ADD_FACULTY_CONSTRAINTS_REQUEST, addFacultyConstraints)
}