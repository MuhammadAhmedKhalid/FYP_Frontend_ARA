import { DELETE_BATCH_REQUEST } from './deleteBatchTypes'

export const deleteBatchRequest = (query) => {
    return {
        type: DELETE_BATCH_REQUEST,
        query
    }
}