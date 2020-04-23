package com.meet.projectboard.controller;

import java.security.Principal;
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
	private ResponseEntity<?> addProject(@Valid @RequestBody Project project, BindingResult bindingResult, Principal principal){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
		if(errorMap != null) return errorMap;
		
		Project newProject = projectService.saveOrUpdateProject(project, principal.getName());
		return new ResponseEntity<Project>(newProject,HttpStatus.OK);
	}
	
	@GetMapping("/{project_identifier}")
	private ResponseEntity<?> getProjectByIdentifier(@PathVariable String project_identifier, Principal principal) {
		
		Project project = projectService.getProject(project_identifier, principal.getName());
		
		return new ResponseEntity<Project>(project,HttpStatus.OK);

	}
	
	@GetMapping("")
	private ResponseEntity<?> getAllProjects(Principal principal){
		
		List<Project> projects = projectService.getProjects(principal.getName());
		return new ResponseEntity<List<Project>>(projects,HttpStatus.OK);
	}
	
	@DeleteMapping("/{project_identifier}")
	private ResponseEntity<?> deleteProjectByIdentifier(@PathVariable String project_identifier, Principal principal){
		
		projectService.deleteProject(project_identifier, principal.getName());
		
		return new ResponseEntity<String>("Project ID '"+project_identifier +"' has been deleted.",HttpStatus.OK);
	}
	
}
