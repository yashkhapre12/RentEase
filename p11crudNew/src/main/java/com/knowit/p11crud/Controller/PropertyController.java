 package com.knowit.p11crud.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.sql.rowset.serial.SerialBlob;
import com.knowit.p11crud.Entity.Area;
import com.knowit.p11crud.Entity.Furnished;
import com.knowit.p11crud.Entity.Property;
import com.knowit.p11crud.Entity.PropertyDTO;
import com.knowit.p11crud.Entity.Propertytype;
import com.knowit.p11crud.Entity.User;
import com.knowit.p11crud.Service.AreaService;
import com.knowit.p11crud.Service.FurnishedService;
import com.knowit.p11crud.Service.PropertyService;
import com.knowit.p11crud.Service.PropertyTypeService;
import com.knowit.p11crud.Service.UserService;

@RestController
@RequestMapping("/api/property")

public class PropertyController {
	
	 @Autowired
	    private PropertyService propertyService;

	 @Autowired
	 private AreaService aserv;
	 
	 @Autowired
	 private UserService userv;
	 
	 @Autowired
	 private FurnishedService fserv;
	 
	 @Autowired
	 private PropertyTypeService ptserv;
	 
	 @PostMapping("/add")
	 public ResponseEntity<Property> addProperty(@RequestBody PropertyDTO dproperty){
		 
		 Area area=aserv.getOne(dproperty.getAreaid());
		 Furnished furnished=fserv.getOne(dproperty.getFurnishid());
		 Propertytype propertytye=ptserv.getOne(dproperty.getPropertytypeid());
		 User user=userv.getOne(dproperty.getUserid());
		 
		 
		 Property property=new Property();
		 property.setAdditionalcharges(dproperty.getAdditionalcharges());
		 property.setAddress(dproperty.getAddress());
		 property.setLeaseduration(dproperty.getLeaseduration());
		 property.setRent(dproperty.getRent());
		 property.setSecuritydeposit(dproperty.getSecuritydeposit());
		 property.setSqfeet(dproperty.getSqfeet());
		 property.setAvailable(dproperty.isAvailable());
		 property.setCreated_at(new Date());
		 property.setGasconnection(dproperty.isGasconnection());
		 property.setParking(dproperty.isParking());
		 
		 property.setAreaid(area);
		 property.setFurnishid(furnished);
		 property.setPropertytypeid(propertytye);
		 property.setUserid(user);
		 
		 
		 Property addProperty=propertyService.addProperty(property);
		 return new ResponseEntity<Property>(addProperty,HttpStatus.CREATED);
	 }
    
    // Endpoint to upload photos for a property
    @PostMapping(value = "/{propertyId}/upload-photos", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPhotos(@PathVariable int propertyId, @RequestParam("photos") MultipartFile[] files) {
        List<String> uploadResults = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                if (file == null || file.isEmpty()) {
                    uploadResults.add("{\"error\": \"One of the files is empty or not present\"}");
                    continue;
                }

                byte[] bytes = file.getBytes();
                Blob blob = new SerialBlob(bytes);
                propertyService.savePhoto(propertyId, bytes);
                uploadResults.add("{\"message\": \"Photo '" + file.getOriginalFilename() + "' uploaded successfully!\"}");
            }
            return ResponseEntity.ok().body(uploadResults);
        } catch (IOException | SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Failed to upload photos: " + e.getMessage() + "\"}");
        }
    }


    
    // Fetch all properties
    @GetMapping("/all")
    public List<Property> getAllAvailableProperties() {
        return propertyService.getAllAvailableProperties();
    }
     
    @GetMapping("/search")
    public List<Property> searchProperties(
            @RequestParam(required = false) Integer areaid,
            @RequestParam(required = false) Integer propertyTypeid,
            @RequestParam(required = false) Integer furnishid) {
        return propertyService.searchProperties(areaid, propertyTypeid, furnishid);
    }
    
    @PutMapping("/{propertyId}")
    public Property updateProperty(@PathVariable int propertyid, @RequestBody PropertyDTO propertyDTO) {
        return propertyService.updateProperty(propertyid, propertyDTO);
    }
    
    @GetMapping("/getProperty/{userId}")
    public ResponseEntity<List<Property>> getPropertiesByUserId(@PathVariable int userId) {
        List<Property> properties = propertyService.getPropertiesByUserId(userId);
        if (properties.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no properties found
        }
        return ResponseEntity.ok(properties);
    }
    
    
    @DeleteMapping("/{propertyId}")
    public ResponseEntity<String> deleteProperty(@PathVariable int propertyId) {
        boolean isDeleted = propertyService.deleteProperty(propertyId);
        
        if (isDeleted) {
            return ResponseEntity.ok("Property deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property not found");
        }
    }
    
    
    
    @PutMapping("/{propertyId}/toggle-availability")
    public ResponseEntity<String> toggleAvailability(@PathVariable int propertyId) {
        boolean isUpdated = propertyService.toggleAvailability(propertyId);
        
        if (isUpdated) {
            return ResponseEntity.ok("Property availability status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property not found.");
        }
    }

    
    
    
    
    
	
	

}
