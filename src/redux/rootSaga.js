import { signupSaga } from './Signup/signupSaga'
import { loginSaga } from './Login/loginSaga'
import { fork } from 'redux-saga/effects';

export function* rootSaga() {
    yield fork(signupSaga)
    yield fork(loginSaga)
}