package com.meet.projectboard.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
public class MapValidationErrorService {

	public ResponseEntity<?> mapValidationError(BindingResult bindingResult){
	 	
		if(bindingResult.hasErrors()) {
			
			Map<String,String> errorMap = new HashMap<String,String>();
			
			for (FieldError fieldError: bindingResult.getFieldErrors()) {
				errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
		
			return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		
	 	return null;
	}
}
