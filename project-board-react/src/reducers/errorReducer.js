import * as actionTypes from '../actions/actionTypes';

const initialState = {}

export const errorReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.GET_ERRORS: 
            return state = action.payload;
        default: 
            return state;
    }
} 