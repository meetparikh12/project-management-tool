package com.meet.projectboard.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.meet.projectboard.exceptions.UsernameAlreadyExistsException;
import com.meet.projectboard.model.User;
import com.meet.projectboard.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveNewUser(User newUser) {
		try {

			newUser.setUsername((newUser.getUsername()));
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);

		}
		
		catch(Exception e) {
			throw new UsernameAlreadyExistsException("Username " +newUser.getUsername() +" already exists.");
		}
		
	}
}
