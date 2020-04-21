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

export function deleteProjectTask(projectSequence){
    return {
        type: actionTypes.DELETE_PROJECT_TASK,
        payload: projectSequence
    }
}


export function getProjectTask(projectTask){
    return {
        type: actionTypes.GET_PROJECT_TASK,
        payload: projectTask
    }
}

export function addProject(error){
    return {
        type: actionTypes.GET_PROJECT_ERROR,
        payload: error
    }
}

export function getProjects(projects){
    return {
        type: actionTypes.GET_PROJECTS,
        payload: projects
    }
}

export function deleteProject(projectID) {
    return {
        type: actionTypes.DELETE_PROJECT,
        payload: projectID
    }
}
export function getProjectById(project){
    return {
        type: actionTypes.GET_SINGLE_PROJECT,
        payload: project
    }
}