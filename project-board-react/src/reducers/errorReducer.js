import * as actionTypes from '../actions/actionTypes';

const initialState = {
    project_task_error: {},
    proeject_error: {}
}

export const errorReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.GET_ERRORS: 
            return {
                ...state,
                project_task_error: action.payload
            }
        
        case actionTypes.GET_PROJECT_ERROR:
            return {
                ...state,
                project_error: action.payload
            } 
        default: 
            return state;
    }

} 