import { ADD_NOTIFICATION_FAILURE, ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESS } from './addNotificationTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addNotification(notification) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'https://fypbackendara-production.up.railway.app/addNotification', notification.notification, { headers });
        yield put({ type: ADD_NOTIFICATION_SUCCESS, message: "Notification added successfully." })
    } catch (error) {
        yield put({ type: ADD_NOTIFICATION_FAILURE, message: error.response.data })
    }
}

export function* addNotificationSaga() {
    yield takeEvery(ADD_NOTIFICATION_REQUEST, addNotification)
}