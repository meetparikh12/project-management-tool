import * as actionTypes from '../actions/actionTypes';

const initialState = {
    addProjectTask: [1,"meet"]
}

const addProjectTask = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_PROJECT_TASK: 
           // let newArray = state.addProjectTask;
           // console.log(state.addProjectTask)
           // console.log(newArray);
            console.log(action.payload);
            // console.log(newArray)
            // let displayArray = [...newArray];
            // console.log(displayArray)
            return {
                ...state,
                //addProjectTask: displayArray
            }
        default: 
            return {
                state
            }
    }

}

export default addProjectTask;