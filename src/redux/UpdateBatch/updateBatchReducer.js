import { UPDATE_BATCH_FAILURE, UPDATE_BATCH_REQUEST, UPDATE_BATCH_SUCCESS } from './updateBatchTypes'

const updateBatchInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateBatchReducer = (state = updateBatchInitialState, action) => {
    switch (action.type) {
        case UPDATE_BATCH_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_BATCH_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_BATCH_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}