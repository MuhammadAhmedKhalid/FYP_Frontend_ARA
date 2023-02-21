import { GET_POSITION_FAILURE, GET_POSITION_REQUEST, GET_POSITION_SUCCESS } from './getPositionTypes'
import { put, takeEvery, call } from 'redux-saga/effects'
import { select } from 'redux-saga/effects';
import axios from 'axios';

function* getPositionRequest(data) {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result;
        if (data.query !== 0) {
            result = yield call(axios.get, `http://localhost:8080/getPositions/${data.query}`, { headers });
        }
        yield put({ type: GET_POSITION_SUCCESS, data: result.data })
    } catch (e) {
        yield put({ type: GET_POSITION_FAILURE, message: e.message })
    }
}

export function* getFacultySaga() {
    yield takeEvery(GET_POSITION_REQUEST, getPositionRequest)
}