import { ASSIGNED_COURSES_FAILURE, ASSIGNED_COURSES_REQUEST, ASSIGNED_COURSES_SUCCESS } from './assignedCoursesTypes'

const assignedCoursesInitialState = {
    loading: false,
    assignedCourses: [],
    error: '',
    added: false
}

export const assignedCoursesReducer = (state = assignedCoursesInitialState, action) => {
    switch (action.type) {
        case ASSIGNED_COURSES_REQUEST: return {
            ...state,
            loading: true
        }
        case ASSIGNED_COURSES_SUCCESS: return {
            ...state,
            loading: false,
            assignedCourses: action.result,
            error: '',
            added: true
        }
        case ASSIGNED_COURSES_FAILURE: return {
            ...state,
            loading: false,
            assignedCourses: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}