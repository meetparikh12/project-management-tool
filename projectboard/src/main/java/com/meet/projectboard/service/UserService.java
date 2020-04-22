package com.meet.projectboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meet.projectboard.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
}
