import { GET_RESOURCES_FAILURE, GET_RESOURCES_REQUEST, GET_RESOURCES_SUCCESS } from './getResourcesTypes'
import { put, takeEvery, select, call } from 'redux-saga/effects'
import axios from 'axios'

function* getResourcesRequest() {
    try {
        const token = yield select(state => state.login.user.jwt)
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        let data = yield call(axios.get, 'http://localhost:8080/resources', { headers })
        yield put({ type: GET_RESOURCES_SUCCESS, data })
    } catch (e) {
        yield put({ type: GET_RESOURCES_FAILURE, message: e.message })
    }
}

export function* getResourcesSaga() {
    yield takeEvery(GET_RESOURCES_REQUEST, getResourcesRequest)
}