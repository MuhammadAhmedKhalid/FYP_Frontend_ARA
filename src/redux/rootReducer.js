import { combineReducers } from "redux";
import { signupReducer } from "./Signup/signupReducer"
import { loginReducer } from "./Login/loginReducer"

export const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer
})