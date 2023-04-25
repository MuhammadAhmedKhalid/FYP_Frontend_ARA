import { UPDATE_BATCH_REQUEST } from './updateBatchTypes'

export const updateBatch = (department_id, batchId, batchYear) => {
    return {
        type: UPDATE_BATCH_REQUEST,
        department_id,
        batchId,
        batchYear
    }
}