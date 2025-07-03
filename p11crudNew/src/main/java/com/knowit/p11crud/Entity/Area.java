package com.knowit.p11crud.Entity;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name="area")
@Entity
public class Area {
	
	  @Id
	  private Integer areaid;  // Area ID (Primary Key)
	  private String areaname;
	  private Integer pincode;
	  private Integer cityid;
	  
	  @JsonIgnoreProperties("areaid")
	  @OneToMany(mappedBy = "areaid",cascade = CascadeType.ALL)
	  private Set<User> users;
	   
	  @JsonIgnoreProperties("areaid")
	  @OneToMany(mappedBy = "areaid", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	   private List<Property> properties;

}
