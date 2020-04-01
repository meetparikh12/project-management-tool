package com.meet.projectboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.model.ProjectTask;
import com.meet.projectboard.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	public ProjectTask saveOrUpdateProjectTask(ProjectTask projectTask) {
		
		if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
			projectTask.setStatus("TO_DO");
		}
		projectTaskRepository.save(projectTask);
		return projectTask;
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
