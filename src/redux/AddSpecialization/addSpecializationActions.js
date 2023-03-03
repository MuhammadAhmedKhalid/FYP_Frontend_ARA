import { ADD_SPECIALIZATION_REQUEST, RESET_STATE } from './addSpecializationTypes'

export const addSpecializationRequest = (specialization) => {
    return {
        type: ADD_SPECIALIZATION_REQUEST,
        specialization
    }
}

export const resetState = () => {
    return {
        type: RESET_STATE
    }
}