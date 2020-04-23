package com.meet.projectboard.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.meet.projectboard.model.User;
import com.meet.projectboard.payload.JWTLoginSuccessResponse;
import com.meet.projectboard.payload.LoginRequest;
import com.meet.projectboard.security.JwtTokenProvider;
import com.meet.projectboard.security.SecurityConstants;
import com.meet.projectboard.service.MapValidationErrorService;
import com.meet.projectboard.service.UserService;
import com.meet.projectboard.validators.UserValidator;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired 
	private UserValidator userValidator;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	private ResponseEntity<?> authenticationUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
		if(errorMap != null) return errorMap;
		
		Authentication authentication = authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(
								loginRequest.getUsername(),
								loginRequest.getPassword()
								)
		);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = SecurityConstants.TOKEN_PREFIX + tokenProvider.generateToken(authentication);
		
		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
	}
	@PostMapping("/register")
	private ResponseEntity<?> addNewUser(@Valid @RequestBody User newUser, BindingResult bindingResult) {
		
		userValidator.validate(newUser, bindingResult);
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
		if(errorMap != null) return errorMap;
		
		User user = userService.saveNewUser(newUser);
		return new ResponseEntity<User>(user,HttpStatus.CREATED);
	}
}
