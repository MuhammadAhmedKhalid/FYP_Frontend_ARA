import { UPDATE_ADMIN_FAILURE, UPDATE_ADMIN_REQUEST, UPDATE_ADMIN_SUCCESS } from './updateAdminTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios';

function* updateAdminRequest(payload) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.put, `http://localhost:8080/updateAdmin/${payload.user_id}`, payload.user, { headers });
        yield put({ type: UPDATE_ADMIN_SUCCESS, result })

        localStorage.setItem('name', payload.user.name);

    } catch (e) {
        yield put({ type: UPDATE_ADMIN_FAILURE, message: e.message })
    }
}

export function* updateAdminSaga() {
    yield takeEvery(UPDATE_ADMIN_REQUEST, updateAdminRequest)
}