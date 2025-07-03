package com.knowit.p11crud.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.p11crud.Entity.Area;
import com.knowit.p11crud.Repository.AreaRepository;

@Service
public class AreaService {
	
	@Autowired
	private AreaRepository arepo;
	
	public List<Area>getAllArea(){
		return arepo.findAll();
	}
	
	public Area getOne(int areaid) {
		return arepo.findById(areaid).get();
	}

	

}
