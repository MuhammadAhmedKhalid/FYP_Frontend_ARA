import { put, takeEvery } from 'redux-saga/effects'
import { SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_REQUEST } from './signupTypes'
import axios from 'axios'

function* signup(user) {
    try {
        axios.post('http://localhost:8080/create-user', user.user)
        // .then((response) => { console.log(response) })
        // .catch((error) => { console.log(error) })
        yield put({ type: SIGNUP_SUCCESS, message: "Success" })
    } catch (e) {
        console.log('error')
        yield put({ type: SIGNUP_FAILURE, message: e.message })
    }
}

export function* signupSaga() {
    yield takeEvery(SIGNUP_REQUEST, signup)
}