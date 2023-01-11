import { GET_RESOURCE_TYPES_FAILURE, GET_RESOURCE_TYPES_REQUEST, GET_RESOURCE_TYPES_SUCCESS } from './getResourceTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getResourceTypesRequest() {
    try {
        const token = yield select(state => state.login.user.jwt);
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let data = yield call(axios.get, 'http://localhost:8080/resourceTypes', { headers });
        yield put({ type: GET_RESOURCE_TYPES_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_RESOURCE_TYPES_FAILURE, message: e.message })
    }
}

export function* getResourceTypesSaga() {
    yield takeEvery(GET_RESOURCE_TYPES_REQUEST, getResourceTypesRequest)
}