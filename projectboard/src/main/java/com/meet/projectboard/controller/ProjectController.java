package com.meet.projectboard.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meet.projectboard.model.Project;
import com.meet.projectboard.service.ProjectService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@PostMapping("/project")
	private ResponseEntity<?> addProject(@Valid @RequestBody Project project, BindingResult bindingResult){
		
		if(bindingResult.hasErrors()) {
			
			Map<String,String> errorMap = new HashMap<String,String>();
			
			for (FieldError fieldError: bindingResult.getFieldErrors()) {
				errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
		
			return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		
		Project newProject = projectService.saveOrUpdateProject(project);
		
		return new ResponseEntity<Project>(newProject,HttpStatus.OK);
	}
}
