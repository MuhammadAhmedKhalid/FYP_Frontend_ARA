import { put, takeEvery } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from './loginTypes'
import axios from 'axios'

function* login(user) {
    try {
        const response = yield axios.post('http://localhost:8080/login-admin', user.user)
        yield put({ type: LOGIN_SUCCESS, message: "Logged in successfully.", user: response.data })
    } catch (e) {
        yield put({ type: LOGIN_FAILURE, message: "Login operation failed" })
    }
}

export function* loginSaga() {
    yield takeEvery(LOGIN_REQUEST, login)
}