package com.knowit.p11crud.Entity;

import lombok.Data;

@Data
public class UserDTO {

	 private Integer roleId;  // Changed from int to Integer to match entity
	    private String firstName;
	    private String lastName;
	    private String password;
	    private String aadharNo;
	    private String address;
	    private String contact;
	    private String email;
	    private String upiId;
	    private Integer areaId;  // Fixed hidden character issue

}
