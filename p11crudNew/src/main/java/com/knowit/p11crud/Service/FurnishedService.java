package com.knowit.p11crud.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.p11crud.Entity.Furnished;
import com.knowit.p11crud.Repository.FurnishedRepository;

@Service
public class FurnishedService {
	
	@Autowired
	private FurnishedRepository frepo;
	
	public List<Furnished> getAllFurnished(){
		return frepo.findAll();
	}
	
	public Furnished getOne(int furnishid) {
		return frepo.findById(furnishid).get();
	}
	
	
	

}
