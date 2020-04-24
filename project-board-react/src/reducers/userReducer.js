import * as actionTypes from '../actions/actionTypes';

const initialState = {

}

const userReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_USER:
            return {
                ...state
            }

        case actionTypes.GET_USER:
            return {
                ...state
            }

        default: 
            return state;
    }
}
export default userReducer;