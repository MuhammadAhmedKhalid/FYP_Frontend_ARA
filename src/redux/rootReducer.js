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
import { addCourseReducer } from './AddCourse/addCourseReducer'
import { getPositionReducer } from './GetPosition/getPositionReducer'
import { getCourseReducer } from './GetCourse/getCourseReducer'
import { addStaffReqeReducer } from './AddStaffRequest/staffRequestReducer'
import { staffReqReducer } from './GetStaffRequest/getStaffReqReducer'
import { deleteObjReqReducer } from './DeleteObjectRequest/delObjReqReducer'
import { deleteRoomReqReducer } from './DeleteRoomRequest/delRoomReqReducer'
import { deleteStaffReqReducer } from './DeleteStaffRequest/delStaffReqReducer'
import { objectsPerResReducer } from './GetObjsPerResourceType/getObjsPerResReducer'
import { addBatchReducer } from './AddBatch/addBatchReducer'
import { getBatchesReducer } from './GetBatches/getBatchesReducer'
import { assignCourseReducer } from './AssignCourse/assignCourseReducer'
import { assignedCoursesReducer } from './AssignedCourses/assignedCoursesReducer'
import { assignedCoursesForTableReducer } from './AssignedCoursesForTable/assignedCoursesForTableReducer'
import { addLeaveReducer } from './AddLeaveRequest/addLeaveRequestReducer'
import { leaveReqReducer } from './GetLeaveRequests/getLeaveRequestReducer'
import { deleteLeaveRequestReducer } from './DeleteLeaveRequest/deleteLeaveRequestReducer'
import { jaccardReducer } from './Jaccard/jaccardReducer'
import { updateAssignedCourseReducer } from './UpdateAssignedCourse/updateAssignedCourseReducer'
import { deleteAssignedCourseRequestReducer } from './DeleteAssignedCourse/deleteAssignedCourseReducer'
import { addNotificationReducer } from './AddNotification/addNotificationReducer'
import { notificationsReqReducer } from './GetNotifications/getNotificationsReducer'
import { addWeightageReducer } from './AddWeightage/addWeightageReducer'
import { weightageReducer } from './GetWeightages/getWeightageReducer'
import { updateWeightageReducer } from './UpdateWeightage/updateWeightageReducer'
import { updateDepartmentReducer } from './UpdateDepartment/updateDeptReducer'
import { updateBatchReducer } from './UpdateBatch/updateBatchReducer'
import { updateRoomReducer } from './UpdateRoom/updateRoomReducer'
import { updatePositionReducer } from './UpdatePosition/updatePositionReducer'
import { updateCourseReducer } from './UpdateCourse/updateCourseReducer'

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
    addCourseReducer,
    getPositionReducer,
    getCourseReducer,
    addStaffReqeReducer,
    staffReqReducer,
    deleteObjReqReducer,
    deleteRoomReqReducer,
    deleteStaffReqReducer,
    objectsPerResReducer,
    addBatchReducer,
    getBatchesReducer,
    assignCourseReducer,
    assignedCoursesReducer,
    assignedCoursesForTableReducer,
    addLeaveReducer,
    leaveReqReducer,
    deleteLeaveRequestReducer,
    jaccardReducer,
    updateAssignedCourseReducer,
    deleteAssignedCourseRequestReducer,
    addNotificationReducer,
    notificationsReqReducer,
    addWeightageReducer,
    weightageReducer,
    updateWeightageReducer,
    updateDepartmentReducer,
    updateBatchReducer,
    updateRoomReducer,
    updatePositionReducer,
    updateCourseReducer,
})