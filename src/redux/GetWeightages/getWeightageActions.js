import { GET_WEIGHTAGE_REQUEST } from './getWeightageTypes'

export const getWeightageRequest = (query) => {
    return {
        type: GET_WEIGHTAGE_REQUEST,
        query
    }
}