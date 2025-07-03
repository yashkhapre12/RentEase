package com.knowit.p11crud.Entity;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid")
	private int userId; 
	
//	int roleId;
	
	@Column(name="firstname")
	private String firstName;
	
	@Column(name="lastname")
	private String lastName;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "aadharno")
	private String aadharNo;
	
	@Column(name="address")
	private String address;
	
	@Column(name="contact")
	private String contact;
	
	@Column(name="email")
	private String email;
	
	@Column(name="upiid")
	private String upiId;
	
	//private Integer areaid;
	
	@JsonIgnoreProperties("users")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name= "areaid")
	
	Area areaid;
	
	@JsonIgnoreProperties("users")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name= "roleid")
	private Role roleId;
	
	
	@JsonIgnoreProperties("users")
	 @OneToMany(mappedBy = "userid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Property> properties;
	
}