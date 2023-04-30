import { put, takeEvery } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from './loginTypes'
import axios from 'axios'

function* login(user) {
    try {
        const response = yield axios.post('http://localhost:8080/login', user.user)
        yield put({ type: LOGIN_SUCCESS, message: "Logged in successfully.", user: response.data })

    const token = response.data.jwt;
    
    localStorage.setItem('user_id', response.data.user_id);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('token', token);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('institute_name', response.data.institute_name);
    localStorage.setItem('institute_id', response.data.institute_id);
    localStorage.setItem('faculty_id', response.data.faculty_id);
    localStorage.setItem('is_admin', response.data._admin);
    localStorage.setItem('springStartMonth', response.data.springStartMonth);
    localStorage.setItem('springEndMonth', response.data.springEndMonth);
    localStorage.setItem('fallStartMonth', response.data.fallStartMonth);
    localStorage.setItem('fallEndMonth', response.data.fallEndMonth);

    } catch (e) {
        yield put({ type: LOGIN_FAILURE, message: "Login operation failed" })
    }
}

export function* loginSaga() {
    yield takeEvery(LOGIN_REQUEST, login)
}