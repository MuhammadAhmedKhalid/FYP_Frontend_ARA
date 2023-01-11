import { combineReducers } from "redux";
import { signupReducer } from "./Signup/signupReducer"
import { loginReducer } from "./Login/loginReducer"
import { instituteTypesReducer } from './InstituteTypes/instituteTypesReducer'
import { addInstituteReducer } from './AddInstitute/instituteReducer'
import { institutesReducer } from './GetInstitutes/getInstitutesReducer'
import { addFacultyReducer } from './AddFaculty/addFacultyReducer'
import { getFacultyReducer } from './GetFaculty/getFacultyReduer'
import { roomReqReducer } from './GetRoomRequests/getRoomReqReducer'
import { departmentsReducer } from './GetDepartments/getDepartmentsReducer'
import { roomsReducer } from './GetRooms/getRoomsReducer'
import { addRoomReqeReducer } from './AddRoomRequest/roomRequestReducer'
import { resourceTypeReducer } from './GetResourceTypes/getResourceReducer'
import { resourcesReducer } from './GetResources/getResourcesReducer'

export const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    instituteType: instituteTypesReducer,
    institute: addInstituteReducer,
    getInstitutes: institutesReducer,
    addFaculty: addFacultyReducer,
    getFaculty: getFacultyReducer,
    getRoomRequest: roomReqReducer,
    getDepartments: departmentsReducer,
    getRooms: roomsReducer,
    addRoomRequest: addRoomReqeReducer,
    getResourceTypes: resourceTypeReducer,
    getResources: resourcesReducer
})