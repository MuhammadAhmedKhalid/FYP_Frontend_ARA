import { GET_BATCHES_REQUEST } from './getBatchesTypes'

export const getBatchesRequest = (query) => {
    return {
        type: GET_BATCHES_REQUEST,
        query
    }
}