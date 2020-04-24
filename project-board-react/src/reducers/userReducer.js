import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {},
    validToken: false
}

const booleanActionPayload = payload => {
    if(payload){
        return true
    }else{
        return false
    }
}

const userReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                validToken: booleanActionPayload(action.payload)
            }

        default: 
            return state;
    }
}
export default userReducer;