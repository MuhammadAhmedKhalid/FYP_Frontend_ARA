import { UPDATE_BATCH_REQUEST, RESET_STATE } from './updateBatchTypes'

export const updateBatch = (departmentId, batchId, batch) => {
    return {
        type: UPDATE_BATCH_REQUEST,
        batchId,
        departmentId,
        batch
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}