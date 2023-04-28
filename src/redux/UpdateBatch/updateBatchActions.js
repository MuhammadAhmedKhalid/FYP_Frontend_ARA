import { UPDATE_BATCH_REQUEST, RESET_STATE } from './updateBatchTypes'

export const updateBatch = (batchId, department_id, batchYear) => {
    return {
        type: UPDATE_BATCH_REQUEST,
        batchId,
        department_id,
        batchYear : parseInt(batchYear)
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}