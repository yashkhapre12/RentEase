package com.knowit.p11crud.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.knowit.p11crud.Entity.Photos;
import com.knowit.p11crud.Entity.Property;

import jakarta.transaction.Transactional;

@Repository
public interface PhotosRepository extends JpaRepository<Photos, Integer> {
	
	 @Transactional
	    void deleteByPropertyid(Property property);

}
