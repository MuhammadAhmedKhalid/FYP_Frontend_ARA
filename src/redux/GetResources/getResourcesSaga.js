import { GET_RESOURCES_FAILURE, GET_RESOURCES_REQUEST, GET_RESOURCES_SUCCESS } from './getResourcesTypes'
import { put, takeEvery, select, call } from 'redux-saga/effects'
import axios from 'axios'

function* getResourcesRequest(data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        let result = yield call(axios.get, `https://fypbackendara-production.up.railway.app/resources/${data.query}`, { headers })
        yield put({ type: GET_RESOURCES_SUCCESS, result })
    } catch (e) {
        yield put({ type: GET_RESOURCES_FAILURE, message: e.message })
    }
}

export function* getResourcesSaga() {
    yield takeEvery(GET_RESOURCES_REQUEST, getResourcesRequest)
}