import { GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS } from './getNotificationsTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getNotificationsRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url  = `http://localhost:8080/getNotifications/${data.query}`;
        let result = yield call(axios.get, url, { headers });
        yield put({ type: GET_NOTIFICATIONS_SUCCESS, result })
    } catch (e) {
        yield put({ type: GET_NOTIFICATIONS_FAILURE, message: e.message })
    }
}

export function* getNotificationsReqSaga() {
    yield takeEvery(GET_NOTIFICATIONS_REQUEST, getNotificationsRequest)
}