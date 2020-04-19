package com.meet.projectboard.controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meet.projectboard.model.ProjectTask;
import com.meet.projectboard.service.MapValidationErrorService;
import com.meet.projectboard.service.ProjectTaskService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BacklogController {

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/backlog/{backlog_id}")
	private ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult, @PathVariable String backlog_id){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
		if(errorMap != null) return errorMap;
		
		
		ProjectTask newProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask);
		
		return new ResponseEntity<ProjectTask>(newProjectTask,HttpStatus.CREATED);
	}
	
//	@GetMapping("")
//	private ResponseEntity<?> getAllProjectTasks(){
//		
//		List<ProjectTask> listOfProjectTasks = projectTaskService.getAllProjectTasks();
//		return new ResponseEntity<List<ProjectTask>>(listOfProjectTasks,HttpStatus.OK);
//	
//	}
	
	@GetMapping("/backlog/{backlog_id}/{projectSequence}")
	private ResponseEntity<?> getProjectTaskByProjectSequence(@PathVariable String projectSequence, @PathVariable String backlog_id){
		
		ProjectTask projectTask = projectTaskService.getSingleProjectTask(projectSequence, backlog_id);
		
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}
	
	@GetMapping("/backlog/{backlog_id}")
	private Iterable<ProjectTask> getProjectTask(@PathVariable String backlog_id){
				
		return projectTaskService.getProjectTasksById(backlog_id);
	}

	@DeleteMapping("/{pt_id}")
	private ResponseEntity<?> deleteProjectTask(@PathVariable Long pt_id) {
		
		projectTaskService.deleteProjectTaskById(pt_id);
		
		return new ResponseEntity<String>("Project Task is deleted.",HttpStatus.OK);
	}
}
