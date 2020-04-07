package com.meet.projectboard.controller;

import java.util.List;

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

import com.meet.projectboard.model.Project;
import com.meet.projectboard.service.MapValidationErrorService;
import com.meet.projectboard.service.ProjectService;

@RestController
@CrossOrigin
@RequestMapping("/api/project")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	private ResponseEntity<?> addProject(@Valid @RequestBody Project project, BindingResult bindingResult){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
		if(errorMap != null) return errorMap;
		
		Project newProject = projectService.saveOrUpdateProject(project);
		return new ResponseEntity<Project>(newProject,HttpStatus.OK);
	}
	
	@GetMapping("/{project_identifier}")
	private ResponseEntity<?> getProjectByIdentifier(@PathVariable String project_identifier) {
		
		Project project = projectService.getProject(project_identifier);
		
		return new ResponseEntity<Project>(project,HttpStatus.OK);

	}
	
	@GetMapping("")
	private ResponseEntity<?> getAllProjects(){
		
		List<Project> projects = projectService.getProjects();
		return new ResponseEntity<List<Project>>(projects,HttpStatus.OK);
	}
	
	@DeleteMapping("/{project_identifier}")
	private ResponseEntity<?> deleteProjectByIdentifier(@PathVariable String project_identifier){
		
		projectService.deleteProject(project_identifier);
		
		return new ResponseEntity<String>("Project ID '"+project_identifier +"' has been deleted.",HttpStatus.OK);
	}
	
}
