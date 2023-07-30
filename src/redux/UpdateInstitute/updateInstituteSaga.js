import { UPDATE_INSTITUTE_FAILURE, UPDATE_INSTITUTE_REQUEST, UPDATE_INSTITUTE_SUCCESS } from './updateInstituteTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* updateInstituteRequest(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.put, `https://fypbackendara-production.up.railway.app/updateInstitute/${payload.institute_id}`, payload.institute, { headers });
        yield put({ type: UPDATE_INSTITUTE_SUCCESS, result })

        localStorage.setItem('institute_name', payload.institute.institute_name);

    } catch (e) {
        yield put({ type: UPDATE_INSTITUTE_FAILURE, message: e.message })
    }
}

export function* updateInstituteSaga() {
    yield takeEvery(UPDATE_INSTITUTE_REQUEST, updateInstituteRequest)
}