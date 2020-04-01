package com.meet.projectboard.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meet.projectboard.model.ProjectTask;
import com.meet.projectboard.service.ProjectTaskService;

@RestController
@CrossOrigin
@RequestMapping("/api/projectboard")
public class ProjectTaskController {

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@PostMapping("")
	private ResponseEntity<?> addProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) {
			
			Map<String, String> errorMap = new HashMap<String,String>();
			
			for(FieldError fieldError : bindingResult.getFieldErrors()) {
				errorMap.put(fieldError.getField(),fieldError.getDefaultMessage());
			}
			return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		
		ProjectTask newProjectTask = projectTaskService.saveOrUpdateProjectTask(projectTask);
		
		return new ResponseEntity<ProjectTask>(newProjectTask,HttpStatus.OK);
	}
	
	@GetMapping("")
	private ResponseEntity<?> getAllProjectTasks(){
		
		List<ProjectTask> listOfProjectTasks = projectTaskService.getAllProjectTasks();
		return new ResponseEntity<List<ProjectTask>>(listOfProjectTasks,HttpStatus.OK);
	
	}
	
	@GetMapping("/{pt_id}")
	private ResponseEntity<?> getProjectTask(@PathVariable Long pt_id){
		
		ProjectTask projectTask = projectTaskService.getProjectTaskById(pt_id);
		
		return new ResponseEntity<ProjectTask>(projectTask,HttpStatus.OK);
	}

}
