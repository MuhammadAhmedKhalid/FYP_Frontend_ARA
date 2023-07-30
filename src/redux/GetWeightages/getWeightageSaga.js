import { GET_WEIGHTAGE_FAILURE, GET_WEIGHTAGE_REQUEST, GET_WEIGHTAGE_SUCCESS } from './getWeightageTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getWeightagesRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if(data.query > 0){
            let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/getWeightage/${data.query}`, { headers });
            yield put({ type: GET_WEIGHTAGE_SUCCESS, result })
        }
    } catch (e) {
        yield put({ type: GET_WEIGHTAGE_FAILURE, message: e.message })
    }
}

export function* getWeightagesSaga() {
    yield takeEvery(GET_WEIGHTAGE_REQUEST, getWeightagesRequest)
}