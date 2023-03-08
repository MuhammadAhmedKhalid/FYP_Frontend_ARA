import { ADD_BATCH_REQUEST, RESET_STATE } from './addBatchTypes'

export const addBatchtRequest = (batch) => {
    return {
        type: ADD_BATCH_REQUEST,
        batch
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}