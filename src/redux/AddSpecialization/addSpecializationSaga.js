import { ADD_SPECIALIZATION_FAILURE, ADD_SPECIALIZATION_REQUEST, ADD_SPECIALIZATION_SUCCESS } from './addSpecializationTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addSpecialization(specialization) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addSpecialization', specialization.specialization, { headers });
        yield put({ type: ADD_SPECIALIZATION_SUCCESS, message: "Specialization added successfully." })
    } catch (error) {
        yield put({ type: ADD_SPECIALIZATION_FAILURE, message: "Add Specialization operation failed." })
    }
}

export function* addSpecializationSaga() {
    yield takeEvery(ADD_SPECIALIZATION_REQUEST, addSpecialization)
}