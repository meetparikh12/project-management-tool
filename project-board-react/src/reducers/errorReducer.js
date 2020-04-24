import * as actionTypes from '../actions/actionTypes';

const initialState = {
    project_task_error: {},
    project_error: {},
    user_creation_error: {}
}

export const errorReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.GET_ERRORS: 
            return {
                project_task_error: action.payload
            }
        
        case actionTypes.GET_PROJECT_ERROR:
            return {
                project_error: action.payload
            } 
        
        case actionTypes.USER_CREATION_ERRROR:
            return {
                user_creation_error: action.payload
            }
        default: 
            return {...state}
    }

} 