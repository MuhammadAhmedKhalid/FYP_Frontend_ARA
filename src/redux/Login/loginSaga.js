import { put, takeEvery } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from './loginTypes'
import axios from 'axios'

function* login(user) {
    try {
        axios.post('http://localhost:8080/login-admin', user.user)
        yield put({ type: LOGIN_SUCCESS, message: "Success" })
    } catch (e) {
        yield put({ type: LOGIN_FAILURE, message: e.message })
    }
}

export function* loginSaga() {
    yield takeEvery(LOGIN_REQUEST, login)
}