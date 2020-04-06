package com.meet.projectboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.meet.projectboard.service.ProjectService;

@RestController
public class ProjectController {

	@Autowired
	private ProjectService projectService;
}
