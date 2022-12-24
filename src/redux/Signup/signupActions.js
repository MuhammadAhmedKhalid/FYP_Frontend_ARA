import { SIGNUP_REQUEST } from "./signupTypes"

export const signupRequest = (user) => {
    return {
        type: SIGNUP_REQUEST,
        user
    }
}