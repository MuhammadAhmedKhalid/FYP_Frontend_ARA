import { LOGIN_REQUEST } from "./loginTypes"

export const loginRequest = (user) => {
    return {
        type: LOGIN_REQUEST,
        user
    }
}