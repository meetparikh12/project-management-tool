import * as actionTypes from "./actionTypes";
import axios from 'axios';

export function addProjectTask(errorResponse){
    
   return { 
    type : actionTypes.GET_ERRORS,
    payload : errorResponse
   }
}