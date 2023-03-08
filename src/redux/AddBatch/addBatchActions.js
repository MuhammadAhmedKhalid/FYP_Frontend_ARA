import { ADD_BATCH_REQUEST } from './addBatchTypes'

export const addBatchtRequest = (batch) => {
    return {
        type: ADD_BATCH_REQUEST,
        batch
    }
}