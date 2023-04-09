import { ADD_WEIGHTAGE_FAILURE, ADD_WEIGHTAGE_REQUEST, ADD_WEIGHTAGE_SUCCESS } from './addWeightageTypes'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { select } from 'redux-saga/effects';

function* addWeightage(payload) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        yield call(axios.post, 'http://localhost:8080/addWeightage', payload.weightage, { headers });
        yield put({ type: ADD_WEIGHTAGE_SUCCESS, message: "Weightage added successfully." })
    } catch (error) {
        yield put({ type: ADD_WEIGHTAGE_FAILURE, message: error.response.data })
    }
}

export function* addWeightageSaga() {
    yield takeEvery(ADD_WEIGHTAGE_REQUEST, addWeightage)
}