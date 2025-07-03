package com.knowit.p11crud.Entity;

import java.sql.Blob;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="furnished")
public class Furnished {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int furnishid;
	
	
	@Column
	private String furnishtype;
	
	@JsonIgnoreProperties("furnishid")
	 @OneToMany(mappedBy = "furnishid")  // Inverse side of the relationship
	
    private List<Property> properties;

}
