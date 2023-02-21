import { ADD_SPECIALIZATION_REQUEST } from './addSpecializationTypes'

export const addSpecializationRequest = (specialization) => {
    return {
        type: ADD_SPECIALIZATION_REQUEST,
        specialization
    }
}