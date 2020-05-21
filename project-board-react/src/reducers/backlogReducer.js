import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projectTasks: [],
    currentTask: null
}

const backlogReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_PROJECT_TASKS: 
           
        return {   
            projectTasks: action.payload
        }

        case actionTypes.DELETE_PROJECT_TASK:
            return {
                ...state,    
                projectTasks: state.projectTasks.filter((projectTask) => 
                                projectTask.projectSequence !== action.payload)
            }

        case actionTypes.GET_PROJECT_TASK:
            return {
                ...state,
                currentTask: action.payload
            }
        default: 
            return {
                state
            }
    }

}

export default backlogReducer;