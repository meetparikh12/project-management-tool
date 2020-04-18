package com.meet.projectboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.model.Backlog;
import com.meet.projectboard.model.ProjectTask;
import com.meet.projectboard.repository.BacklogRepository;
import com.meet.projectboard.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private BacklogRepository backlogRepository;

//	public ProjectTask saveOrUpdateProjectTask(ProjectTask projectTask) {
//		
//		if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
//			projectTask.setStatus("TO_DO");
//		}
//		projectTaskRepository.save(projectTask);
//		return projectTask;
//	}

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		projectTask.setBacklog(backlog);
		
		Integer backlogSequence = backlog.getPTSequence();
		backlogSequence++;
		
		projectTask.setProjectSequence(projectIdentifier + "-" +backlogSequence);
		projectTask.setProjectIdentifier(projectIdentifier);
		
		if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
			projectTask.setStatus("TO_DO");
		}
		
		return projectTaskRepository.save(projectTask);
		
	}
	
	public List<ProjectTask> getAllProjectTasks() {
		
		return projectTaskRepository.findAll();
	}

	public ProjectTask getProjectTaskById(Long id) {
		
		return projectTaskRepository.getById(id);
	}

	public void deleteProjectTaskById(Long id) {
		
		projectTaskRepository.deleteById(id);
	}
	
}
