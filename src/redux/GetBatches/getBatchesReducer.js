import { GET_BATCHES_FAILURE, GET_BATCHES_REQUEST, GET_BATCHES_SUCCESS } from './getBatchesTypes'

const batchesInitialState = {
    loading: false,
    batches: [],
    error: '',
    added: false
}

export const getBatchesReducer = (state = batchesInitialState, action) => {
    switch (action.type) {
        case GET_BATCHES_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_BATCHES_SUCCESS: return {
            ...state,
            loading: false,
            batches: action.result,
            error: '',
            added: true
        }
        case GET_BATCHES_FAILURE: return {
            ...state,
            loading: false,
            batches: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}