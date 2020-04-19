package com.meet.projectboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.exceptions.ProjectNotFoundException;
import com.meet.projectboard.model.Backlog;
import com.meet.projectboard.model.Project;
import com.meet.projectboard.model.ProjectTask;
import com.meet.projectboard.repository.BacklogRepository;
import com.meet.projectboard.repository.ProjectRepository;
import com.meet.projectboard.repository.ProjectTaskRepository;

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
	
	public List<ProjectTask> getAllProjectTasks() {
		
		return projectTaskRepository.findAll();
	}

	public Iterable<ProjectTask> getProjectTaskById(String projectIdentifier) {
		
		Project project = projectRepository.getByProjectIdentifier(projectIdentifier.toUpperCase());
		
		if ( project == null ) {
			throw new ProjectNotFoundException("Project with ID '" +projectIdentifier +"' does not exist.");
		}
		
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
	}

	public void deleteProjectTaskById(Long id) {
		
		projectTaskRepository.deleteById(id);
	}
	
}
