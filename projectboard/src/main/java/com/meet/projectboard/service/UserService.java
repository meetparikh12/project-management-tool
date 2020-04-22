package com.meet.projectboard.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.meet.projectboard.model.User;
import com.meet.projectboard.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveNewUser(User newUser) {
		
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		
		return userRepository.save(newUser);
	}
}
