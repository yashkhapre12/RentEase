package com.knowit.p11crud.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.p11crud.Entity.Propertytype;
import com.knowit.p11crud.Service.PropertyTypeService;

@RestController
@RequestMapping("/api/propertytype")
@CrossOrigin
public class PropertyTyeController {
	@Autowired
	private PropertyTypeService ptserv;
	
	@GetMapping("/getPropertyType")
	public ResponseEntity<List<Propertytype>> getAllPropertyType(){
		List<Propertytype> allPropertyType=ptserv.getAllPropertyType();
		return new ResponseEntity<List<Propertytype>>(allPropertyType, HttpStatus.OK);
		
	}

}
