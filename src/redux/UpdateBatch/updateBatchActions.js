import { UPDATE_BATCH_REQUEST, RESET_STATE } from './updateBatchTypes'

export const updateBatch = (batchId, batch) => {
    return {
        type: UPDATE_BATCH_REQUEST,
        batchId,
        batch
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}