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

export function deleteProjectTask(id){
    return {
        type: actionTypes.DELETE_PROJECT_TASK,
        payload: id
    }
}

export function getProjectTask(projectTask){
    return {
        type: actionTypes.GET_PROJECT_TASK,
        payload: projectTask
    }
}