package com.knowit.p11crud.Entity;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="propertytype")
public class Propertytype {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int propertytypeid;
	
	@Column
	private String propertytypename;
	
	
	@JsonIgnoreProperties("propertytypeid")
	@OneToMany(mappedBy = "propertytypeid")  

    private List<Property> properties;

}
