import { CHECK_VALIDITY_REQUEST } from './checkValidityTypes'

export const checkTokenRequest = (token) => {
    return {
        type: CHECK_VALIDITY_REQUEST,
        token
    }
}