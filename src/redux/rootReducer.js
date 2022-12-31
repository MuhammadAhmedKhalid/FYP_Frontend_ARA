import { combineReducers } from "redux";
import { signupReducer } from "./Signup/signupReducer"
import { loginReducer } from "./Login/loginReducer"
import { instituteTypesReducer } from './InstituteTypes/instituteTypesReducer'
import { addInstituteReducer } from './AddInstitute/instituteReducer'
import { institutesReducer } from './GetInstitutes/getInstitutesReducer'
import { getAdminReducer } from './GetAdmin/getAdminReducer'
import { addFacultyReducer } from './AddFaculty/addFacultyReducer'

export const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    instituteType: instituteTypesReducer,
    institute: addInstituteReducer,
    getInstitutes: institutesReducer,
    getAdmin: getAdminReducer,
    addFaculty: addFacultyReducer
})