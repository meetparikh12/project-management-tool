package com.meet.projectboard.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.exceptions.ProjectNotFoundException;
import com.meet.projectboard.exceptions.ProjectTaskNotFoundException;
import com.meet.projectboard.model.Backlog;
import com.meet.projectboard.model.Project;
import com.meet.projectboard.model.ProjectTask;
import com.meet.projectboard.repository.BacklogRepository;
import com.meet.projectboard.repository.ProjectRepository;
import com.meet.projectboard.repository.ProjectTaskRepository;

/**
 * Service layer for Project Task
 * @author MEET
 *
 */
@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private ProjectRepository projectRepository;

//	public ProjectTask saveOrUpdateProjectTask(ProjectTask projectTask) {
//		
//		if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
//			projectTask.setStatus("TO_DO");
//		}
//		projectTaskRepository.save(projectTask);
//		return projectTask;
//	}

	/**
	 * Method for adding project task to backlog
	 * @param projectIdentifier
	 * @param projectTask
	 * @return
	 */
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		
		try {
		
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			
			projectTask.setBacklog(backlog);
			
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence++;
			
			backlog.setPTSequence(backlogSequence);
	
			projectTask.setProjectSequence(projectIdentifier + "-" +backlogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);
			
			if(projectTask.getPriority() == null) {
				projectTask.setPriority(3);
			}
			
			if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
				projectTask.setStatus("TO_DO");
			}
			
			return projectTaskRepository.save(projectTask);
		}
		
		catch(Exception e) {
			
			throw new ProjectNotFoundException("Project '"+projectIdentifier +"' not found");
		}
		
	}
	
//	public List<ProjectTask> getAllProjectTasks() {
//		
//		return projectTaskRepository.findAll();
//	}

	/**
	 * Method for fetching all project Tasks for defined project-id
	 * @param projectIdentifier
	 * @return
	 */
	public Iterable<ProjectTask> getProjectTasksById(String projectIdentifier) {
		
		Project project = projectRepository.getByProjectIdentifier(projectIdentifier.toUpperCase());
		
		if ( project == null ) {
			throw new ProjectNotFoundException("Project with ID '" +projectIdentifier +"' does not exist.");
		}
		
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
	}

	public void deleteProjectTaskById(Long id) {
		
		projectTaskRepository.deleteById(id);
	}

	/**
	 * Method for fetching single project task using project sequence
	 * @param projectSequence
	 * @param backlog_id
	 * @return
	 */
	public ProjectTask getSingleProjectTask(String projectSequence, String backlog_id) {
		
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		
		if(backlog == null) {

			throw new ProjectNotFoundException("Project with ID '" +backlog_id +"' does not exist.");

		}
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
		
		if(projectTask == null) {
			
			throw new ProjectTaskNotFoundException("Project Task with sequence '" +projectSequence +"' not found.");
		}
		
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {

			throw new ProjectTaskNotFoundException("Project Task '" +projectSequence +"' does not exist in Project '" +backlog_id +"'");

		}
		
		return projectTask;
	}
	
	public ProjectTask updateProjectTask(ProjectTask updatedProjectTask, String backlog_id, String projectSequence) {
		
		ProjectTask projectTask = getSingleProjectTask(projectSequence, backlog_id);
		projectTask = updatedProjectTask;
		return projectTaskRepository.save(projectTask);
		
	}
	
}
