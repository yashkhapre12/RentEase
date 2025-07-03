package com.knowit.p11crud.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowit.p11crud.Entity.Furnished;
import com.knowit.p11crud.Service.FurnishedService;

@RestController
@RequestMapping("/api/furnished")
@CrossOrigin
public class FurnishedController {
	@Autowired
	private FurnishedService fserv;
	
	@GetMapping("/getFurnished")
	public ResponseEntity<List<Furnished>> getAllFunrnished(){
		List<Furnished> allFurnished=fserv.getAllFurnished();
		return new ResponseEntity<List<Furnished>>(allFurnished, HttpStatus.OK);
	}

}
