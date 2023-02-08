import { LOGIN_REQUEST, LOGOUT_REQUEST, RESET_ID_REQUEST } from "./loginTypes"

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

export const resetIdRequest = (id, name) => {
    return {
        type: RESET_ID_REQUEST,
        id,
        name
    }
}