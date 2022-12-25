import { LOGIN_REQUEST, LOGOUT_REQUEST } from "./loginTypes"

export const loginRequest = (user) => {
    return {
        type: LOGIN_REQUEST,
        user
    }
}
export const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    }
}