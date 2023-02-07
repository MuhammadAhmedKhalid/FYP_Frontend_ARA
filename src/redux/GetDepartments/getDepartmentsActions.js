import { GET_DEPARTEMNTS_REQUEST } from './getDepartmentsTypes'

export const getDepartmentsRequest = (query) => {
    return {
        type: GET_DEPARTEMNTS_REQUEST,
        query
    }
}