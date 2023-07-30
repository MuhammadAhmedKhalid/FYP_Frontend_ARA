import { GET_RESOURCE_TYPES_FAILURE, GET_RESOURCE_TYPES_REQUEST, GET_RESOURCE_TYPES_SUCCESS } from './getResourceTypes'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios';

function* getResourceTypesRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/resourceTypes/${data.query}`, { headers });
        yield put({ type: GET_RESOURCE_TYPES_SUCCESS, result })
    } catch (e) {
        yield put({ type: GET_RESOURCE_TYPES_FAILURE, message: e.message })
    }
}

export function* getResourceTypesSaga() {
    yield takeEvery(GET_RESOURCE_TYPES_REQUEST, getResourceTypesRequest)
}