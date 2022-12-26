import { put, takeEvery } from 'redux-saga/effects'
import { SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from './signupTypes'
import axios from 'axios'

function* signup(user) {
    try {
        const response = yield axios.post('http://localhost:8080/create-user', user.user)
        yield put({ type: SIGNUP_SUCCESS, response })
    } catch (e) {
        yield put({ type: SIGNUP_FAILURE, e })
    }
}

export function* signupSaga() {
    yield takeEvery(SIGNUP_REQUEST, signup)
}