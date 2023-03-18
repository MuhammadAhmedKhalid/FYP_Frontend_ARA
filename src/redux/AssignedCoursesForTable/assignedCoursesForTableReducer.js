import { ASSIGNED_COURSES_FOR_TABLE_FAILURE, ASSIGNED_COURSES_FOR_TABLE_REQUEST, ASSIGNED_COURSES_FOR_TABLE_SUCCESS } from './assignedCoursesForTableTypes'

const assignedCoursesForTableInitialState = {
    loading: false,
    assignedCourses: [],
    error: '',
    added: false
}

export const assignedCoursesForTableReducer = (state = assignedCoursesForTableInitialState, action) => {
    switch (action.type) {
        case ASSIGNED_COURSES_FOR_TABLE_REQUEST: return {
            ...state,
            loading: true
        }
        case ASSIGNED_COURSES_FOR_TABLE_SUCCESS: return {
            ...state,
            loading: false,
            assignedCourses: action.result,
            error: '',
            added: true
        }
        case ASSIGNED_COURSES_FOR_TABLE_FAILURE: return {
            ...state,
            loading: false,
            assignedCourses: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}