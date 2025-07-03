package com.knowit.p11crud.Entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name="property")
public class Property {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int propertyid;
	
	
	
	@Column
	private String leaseduration;
	
	@Column
	private boolean available;
	
	@Column
	private float rent;
	
	@Column
	private float sqfeet;
	
	@Column
	private float securitydeposit;
	
	@Column(updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date created_at = new Date();
	
	@Column
	private float additionalcharges;
	
	@Column
	private String address;
	
	
	
	@Column
	private boolean gasconnection;
	
	@Column
	private boolean parking;
	
	
	 @JsonIgnoreProperties("properties")
	 @ManyToOne
	 @JoinColumn(name = "userid", nullable = false)
	 private User userid;
	 
	 @JsonIgnoreProperties("properties")
	  @ManyToOne
	  @JoinColumn(name = "areaid", nullable = false)
	
	  private Area areaid;
	 
	 @JsonIgnoreProperties("properties")
	 @Basic
	 @OneToMany(mappedBy = "propertyid", cascade = CascadeType.ALL, orphanRemoval = true)
	    private List<Photos> photos;
	 
	 @JsonIgnoreProperties("properties")
	 @ManyToOne
	    @JoinColumn(name = "furnishid")  // Foreign Key in Property Table
	
	    private Furnished furnishid;
	 
	 
	 @JsonIgnoreProperties("properties")
	 @ManyToOne
	    @JoinColumn(name = "propertytypeid")  // Foreign Key to PropertyType
	 
	    private Propertytype propertytypeid;

	
	


}
