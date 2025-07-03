package com.knowit.p11crud.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.p11crud.Entity.Area;
import com.knowit.p11crud.Service.AreaService;

@RestController
@RequestMapping("/api/area")
@CrossOrigin


public class AreaController {
	
	@Autowired
	private AreaService aservice;
	
	@GetMapping("/getArea")
	public ResponseEntity<List<Area>> getAllArea(){
		
		List<Area> allArea = aservice.getAllArea();
		 
		return new ResponseEntity<List<Area>>(allArea,HttpStatus.OK);
	}
	
	
	
	

}
