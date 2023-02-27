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
import { objReqReducer } from './GetObjectRequests/getObjReqReducer'
import { addObjReqReducer } from './AddObjRequest/addObjRequestReducer'
import { objectsReducer } from './GetObjects/getObjectsReducer'
import { addDepartmentReducer } from './AddDepartment/addDepartmentReducer'
import { addRoomReducer } from './AddRoom/addRoomReducer'
import { addObjectReducer } from './AddObject/addObjectReducer'
import { addPositionReducer } from './AddPosition/addPositionReducer'
import { addSpecializationReducer } from './AddSpecialization/addSpecializationReducer'
import { getPositionReducer } from './GetPosition/getPositionReducer'
import { getSpecializationReducer } from './GetSpecialization/getSpecializationReducer'
import { addStaffReqeReducer } from './AddStaffRequest/staffRequestReducer'

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
    getResources: resourcesReducer,
    getObjRequests: objReqReducer,
    addObjRequest: addObjReqReducer,
    getObjects: objectsReducer,
    addDepartmentReducer,
    addRoomReducer,
    addObjectReducer,
    addPositionReducer,
    addSpecializationReducer,
    getPositionReducer,
    getSpecializationReducer,
    addStaffReqeReducer,
})