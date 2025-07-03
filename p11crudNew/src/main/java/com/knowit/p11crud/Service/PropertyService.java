package com.knowit.p11crud.Service;

import java.sql.Blob;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.knowit.p11crud.Entity.Area;
import com.knowit.p11crud.Entity.Furnished;
import com.knowit.p11crud.Entity.Photos;
import com.knowit.p11crud.Entity.Property;
import com.knowit.p11crud.Entity.PropertyDTO;
import com.knowit.p11crud.Entity.Propertytype;
import com.knowit.p11crud.Entity.User;
import com.knowit.p11crud.Repository.AreaRepository;
import com.knowit.p11crud.Repository.FurnishedRepository;
import com.knowit.p11crud.Repository.PhotosRepository;
import com.knowit.p11crud.Repository.PropertyRepository;
import com.knowit.p11crud.Repository.PropertyTypeRepository;
import com.knowit.p11crud.Repository.UserRepository;

@Service
public class PropertyService {
	
	
	 @Autowired
	    private PropertyRepository propertyRepository;

	    @Autowired
	    private PhotosRepository photosRepository;

	    @Autowired
	    private UserRepository userRepository;

	    @Autowired
	    private AreaRepository areaRepository;

	    @Autowired
	    private FurnishedRepository furnishedRepository;

	    @Autowired
	    private PropertyTypeRepository propertyTypeRepository;
	    
	    public Property addProperty(Property property) {
	    	return propertyRepository.save(property);
	    }
	
	    
	    public void savePhoto(int propertyid, byte[] photo) {
	        Property property = propertyRepository.findById(propertyid).orElseThrow(
	                () -> new RuntimeException("Property not found")
	        );

	        Photos newPhoto = new Photos();
	        newPhoto.setPropertyid(property);
	        newPhoto.setPhoto(photo);
	        photosRepository.save(newPhoto);
	    }
	    
	    public List<Property> getAllAvailableProperties() {
	        return propertyRepository.findByAvailableTrue();
	    }
	    
	    public List<Property> searchProperties(Integer areaId, Integer propertyTypeId, Integer furnishId) {
	        return propertyRepository.findFilteredProperties(areaId, propertyTypeId, furnishId);
	    }
	    public List<Property> getPropertiesByUserId(int userId) {
	        return propertyRepository.findByUserid_UserId(userId);
	    }
	    
	    public Property updateProperty(int propertyid, PropertyDTO propertyDTO) {
	        Optional<Property> optionalProperty = propertyRepository.findById(propertyid);

	        if (optionalProperty.isPresent()) {
	            Property property = optionalProperty.get();

	            // Update fields if provided
	            property.setLeaseduration(propertyDTO.getLeaseduration());
	            property.setAvailable(propertyDTO.isAvailable());
	            property.setRent(propertyDTO.getRent());
	            property.setSqfeet(propertyDTO.getSqfeet());
	            property.setSecuritydeposit(propertyDTO.getSecuritydeposit());
	            property.setAdditionalcharges(propertyDTO.getAdditionalcharges());
	            property.setAddress(propertyDTO.getAddress());
	            property.setGasconnection(propertyDTO.isGasconnection());
	            property.setParking(propertyDTO.isParking());

	            // Set updated timestamp (optional)
	            property.setCreated_at(new Date());

	            // Update associated entities if IDs are provided
	            if (propertyDTO.getUserid() > 0) {
	                User user = userRepository.findById(propertyDTO.getUserid())
	                        .orElseThrow(() -> new RuntimeException("User not found"));
	                property.setUserid(user);
	            }

	            if (propertyDTO.getAreaid() > 0) {
	                Area area = areaRepository.findById(propertyDTO.getAreaid())
	                        .orElseThrow(() -> new RuntimeException("Area not found"));
	                property.setAreaid(area);
	            }

	            if (propertyDTO.getFurnishid() > 0) {
	                Furnished furnished = furnishedRepository.findById(propertyDTO.getFurnishid())
	                        .orElseThrow(() -> new RuntimeException("Furnish type not found"));
	                property.setFurnishid(furnished);
	            }

	            if (propertyDTO.getPropertytypeid() > 0) {
	                Propertytype propertyType = propertyTypeRepository.findById(propertyDTO.getPropertytypeid())
	                        .orElseThrow(() -> new RuntimeException("Property type not found"));
	                property.setPropertytypeid(propertyType);
	            }

	            return propertyRepository.save(property);
	        } else {
	            throw new RuntimeException("Property not found");
	        }
	    }
	    
	    public boolean deleteProperty(int propertyId) {
	        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
	        
	        if (propertyOpt.isPresent()) {
	            Property property = propertyOpt.get();

	            // First, delete associated photos explicitly
	            photosRepository.deleteByPropertyid(property);

	            // Then, delete the property itself
	            propertyRepository.deleteById(propertyId);

	            return true;
	        }
	        return false;
	    }
	    
	    public boolean toggleAvailability(int propertyId) {
	        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
	        
	        if (propertyOpt.isPresent()) {
	            Property property = propertyOpt.get();
	            
	            // Toggle the availability field
	            property.setAvailable(!property.isAvailable());
	            
	            // Save the updated property
	            propertyRepository.save(property);
	            return true;
	        }
	        return false;
	    }

	

}
