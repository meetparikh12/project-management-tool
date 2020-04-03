import * as actionTypes from "./actionTypes";

export function addProjectTask(errorResponse){
    
   return { 
    type : actionTypes.GET_ERRORS,
    payload : errorResponse
   }
}

export function getProjectTasks(project_tasks){
    return {
        type: actionTypes.GET_PROJECT_TASKS,
        payload: project_tasks
    }
}