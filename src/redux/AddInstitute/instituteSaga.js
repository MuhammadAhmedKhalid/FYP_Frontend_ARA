import { ADD_INSTITUTE_FAILURE, ADD_INSTITUTE_REQUEST, ADD_INSTITUTE_SUCCESS } from './instituteTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addInstitute(institute) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = yield call(axios.post, 'https://fypbackendara-production.up.railway.app/add_institute', institute.institute, { headers });
        yield put({ type: ADD_INSTITUTE_SUCCESS, message: "Institute added successfully.", response })

        localStorage.setItem('institute_name', response.data.institute_name);
        localStorage.setItem('institute_id', response.data.institute_id);
        localStorage.setItem('springStartMonth', response.data.springStartMonth);
        localStorage.setItem('springEndMonth', response.data.springEndMonth);
        localStorage.setItem('fallStartMonth', response.data.fallStartMonth);
        localStorage.setItem('fallEndMonth', response.data.fallEndMonth);

    } catch (error) {
        yield put({ type: ADD_INSTITUTE_FAILURE, message: "Add institute operation failed." })
    }
}

export function* instituteSaga() {
    yield takeEvery(ADD_INSTITUTE_REQUEST, addInstitute)
}