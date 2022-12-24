import { combineReducers } from "redux";
import { signupReducer } from "./Signup/signupReducer"

export const rootReducer = combineReducers({
    signup: signupReducer
})