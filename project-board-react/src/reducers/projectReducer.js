import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projects : [],
    currentProject : {}
}

const projectReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROJECTS:
            
            return {
                ...state,
                projects: action.payload 
            }
            
        case actionTypes.DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter((project) => project.projectIdentifier !== action.payload)
            }

        case actionTypes.GET_SINGLE_PROJECT:
            return {
                ...state,
                currentProject: action.payload
            }
        default: return state
        }
}

export default projectReducer;