import { UPDATE_BATCH_REQUEST, RESET_STATE } from './updateBatchTypes'

export const updateBatch = (departmentId, batchId, section, batch) => {
    return {
        type: UPDATE_BATCH_REQUEST,
        batchId,
        departmentId,
        section,
        batch
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}