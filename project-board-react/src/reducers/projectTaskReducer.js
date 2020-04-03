import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projectTasks: []
}

const projectTaskReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_PROJECT_TASKS: 
           
        return {
            ...state,
            projectTasks: action.payload
        }

        default: 
            return {
                state
            }
    }

}

export default projectTaskReducer;