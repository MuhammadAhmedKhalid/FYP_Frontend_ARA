import { UPDATE_BATCH_REQUEST, RESET_STATE } from './updateBatchTypes'

export const updateBatch = (department_id, batchId, batchYear) => {
    return {
        type: UPDATE_BATCH_REQUEST,
        department_id,
        batchId,
        batchYear
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}