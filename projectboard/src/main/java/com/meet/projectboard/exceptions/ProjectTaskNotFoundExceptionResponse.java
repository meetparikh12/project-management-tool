package com.meet.projectboard.exceptions;

public class ProjectTaskNotFoundExceptionResponse {

	private String ProjectTaskNotFound;

	public ProjectTaskNotFoundExceptionResponse(String projectTaskNotFound) {
		super();
		ProjectTaskNotFound = projectTaskNotFound;
	}

	public String getProjectTaskNotFound() {
		return ProjectTaskNotFound;
	}

	public void setProjectTaskNotFound(String projectTaskNotFound) {
		ProjectTaskNotFound = projectTaskNotFound;
	}
	
	

}
