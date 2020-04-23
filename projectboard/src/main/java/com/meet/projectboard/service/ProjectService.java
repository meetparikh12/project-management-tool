package com.meet.projectboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.exceptions.ProjectIdException;
import com.meet.projectboard.exceptions.ProjectNotFoundException;
import com.meet.projectboard.model.Backlog;
import com.meet.projectboard.model.Project;
import com.meet.projectboard.model.User;
import com.meet.projectboard.repository.BacklogRepository;
import com.meet.projectboard.repository.ProjectRepository;
import com.meet.projectboard.repository.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project, String username) {
		
		try {
			
			User user = userRepository.findByUsername(username);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
			String projectIdentifier = project.getProjectIdentifier().toUpperCase();
			project.setProjectIdentifier(projectIdentifier);
			
			if(project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIdentifier);
			}
			
			if(project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
			}
			
			return projectRepository.save(project);
		}
		
		catch(Exception e) {
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase() +"' already exists.");
		}
	
	}
	
	public Project getProject(String project_identifier, String username) {
		
		Project project = projectRepository.getByProjectIdentifier(project_identifier.toUpperCase());
		
		if ( project == null ) {
			throw new ProjectIdException("Project ID '" +project_identifier +"' does not exist.");
		}
		if(!project.getProjectLeader().equals(username)) {
			throw new ProjectNotFoundException("Project not found in your account");
		}
		return project;
	}

	public List<Project> getProjects(String username) {

		return projectRepository.findAllByProjectLeader(username);
		
	}

	public void deleteProject(String project_identifier,String username) {
		
		projectRepository.delete(getProject(project_identifier,username));
	}
	
}
