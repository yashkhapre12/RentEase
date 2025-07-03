package com.knowit.p11crud.Entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.Data;

 @Data
 
public class PropertyDTO {
	
	 private int propertyid;
	    private String leaseduration;
	    private boolean available;
	    private float rent;
	    private float sqfeet;
	    private float securitydeposit;
	    private Date created_at;
	    private float additionalcharges;
	    private String address;
	    private boolean gasconnection;
	    private boolean parking;
	    private int userid;
	    private int areaid;
	    private List<Photos> photos;
	    private int furnishid;
	    private int propertytypeid;

}
