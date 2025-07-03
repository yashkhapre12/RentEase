package com.knowit.p11crud.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.knowit.p11crud.Entity.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer>{
	
	 @Query
	 ("SELECT p FROM Property p WHERE " +
	            "(:areaId IS NULL OR p.areaid.areaid = :areaId) AND " +
	            "(:propertyTypeId IS NULL OR p.propertytypeid.propertytypeid = :propertyTypeId) AND " +
	            "(:furnishId IS NULL OR p.furnishid.furnishid = :furnishId)")
	    List<Property> findFilteredProperties(
	            @Param("areaId") Integer areaId,
	            @Param("propertyTypeId") Integer propertyTypeId,
	            @Param("furnishId") Integer furnishId
	    );
	 List<Property> findByUserid_UserId(int userId);
	 
	 
	 List<Property> findByAvailableTrue();

}
