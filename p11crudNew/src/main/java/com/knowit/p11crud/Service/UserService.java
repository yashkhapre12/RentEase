package com.knowit.p11crud.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.p11crud.Entity.User;
import com.knowit.p11crud.Repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository urepo;
	
	public User getOne(int userid) {
		return urepo.findById(userid).orElseThrow(() -> new RuntimeException("User with ID " + userid + " not found"));
	}

}
