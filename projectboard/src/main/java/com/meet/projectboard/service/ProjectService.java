package com.meet.projectboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.exceptions.ProjectIdException;
import com.meet.projectboard.model.Project;
import com.meet.projectboard.repository.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	public Project saveOrUpdateProject(Project project) {
		
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			return projectRepository.save(project);
		}
		
		catch(Exception e) {
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase() +"' already exists.");
		}
	
	}
	
	public Project getProject(String project_identifier) {
		
		Project project = projectRepository.getByProjectIdentifier(project_identifier.toUpperCase());
		
		if ( project == null ) {
			throw new ProjectIdException("Project ID '" +project_identifier +"' does not exist.");
		}
		
		return project;
	}

	public List<Project> getProjects() {

		return projectRepository.findAll();

	}
	
}
