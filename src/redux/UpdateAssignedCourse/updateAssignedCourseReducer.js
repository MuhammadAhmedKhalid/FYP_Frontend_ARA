import { UPDATE_ASSIGNED_COURSE_FAILURE, UPDATE_ASSIGNED_COURSE_REQUEST, UPDATE_ASSIGNED_COURSE_SUCCESS } from './updateAssignedCourseTypes'

const updateAssignedCourseInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateAssignedCourseReducer = (state = updateAssignedCourseInitialState, action) => {
    switch (action.type) {
        case UPDATE_ASSIGNED_COURSE_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_ASSIGNED_COURSE_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_ASSIGNED_COURSE_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        default: return state
    }
}