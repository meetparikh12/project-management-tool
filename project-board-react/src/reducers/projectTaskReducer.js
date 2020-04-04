import * as actionTypes from '../actions/actionTypes';

const initialState = {
    projectTasks: [],
}

const projectTaskReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_PROJECT_TASKS: 
           
        return {   
            projectTasks: action.payload
        }

        case actionTypes.DELETE_PROJECT_TASK:

            let updatedArray = [...state.projectTasks];

            for(let i=0; i<updatedArray.length; i++){
                if(updatedArray[i].id === action.payload){
                    updatedArray.splice(updatedArray.indexOf(updatedArray[i]), 1);
                }
            }

            return {    
                projectTasks: updatedArray
            }

        default: 
            return {
                state
            }
    }

}

export default projectTaskReducer;