import { GET_SPECIALIZATION_REQUEST } from './getSpecializationTypes'

export const getSpecializationRequest = (query) => {
    return {
        type: GET_SPECIALIZATION_REQUEST,
        query
    }
}