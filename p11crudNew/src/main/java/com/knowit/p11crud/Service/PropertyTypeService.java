package com.knowit.p11crud.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.p11crud.Entity.Propertytype;
import com.knowit.p11crud.Repository.PropertyTypeRepository;

@Service
public class PropertyTypeService {
	
	@Autowired
	private PropertyTypeRepository ptrepo;
	
	public List<Propertytype> getAllPropertyType(){
		return ptrepo.findAll();
	}
	
	public Propertytype getOne(int propertytypeid) {
		return ptrepo.findById(propertytypeid).get();
	}

}
