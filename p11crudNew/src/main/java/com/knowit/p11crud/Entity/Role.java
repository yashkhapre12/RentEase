package com.knowit.p11crud.Entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "role")
public class Role {

	@Id
	@Column(name = "roleid")
	private int roleId;

	@Column(name = "rolename", nullable = false)
	private String roleName;

	@JsonIgnoreProperties("roleId")
	@OneToMany(mappedBy = "roleId", cascade = CascadeType.ALL)
	private Set<User> users;
}
