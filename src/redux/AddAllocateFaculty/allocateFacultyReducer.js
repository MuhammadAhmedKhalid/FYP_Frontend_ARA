import { ADD_ALLOCATE_FACULTY_FAILURE, ADD_ALLOCATE_FACULTY_REQUEST, ADD_ALLOCATE_FACULTY_SUCCESS, RESET_STATE } from './allocateFacultyTypes'

export const addAllocateFacultyInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addAllocateFacultyReducer = (state = addAllocateFacultyInitialState, action) => {
    switch (action.type) {
        case ADD_ALLOCATE_FACULTY_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_ALLOCATE_FACULTY_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_ALLOCATE_FACULTY_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}