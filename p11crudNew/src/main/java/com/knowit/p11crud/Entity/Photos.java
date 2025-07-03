package com.knowit.p11crud.Entity;

import java.sql.Blob;
import java.util.Date;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="photos")
public class Photos {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int photoid;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] photo;
	
	
	 @JsonIgnoreProperties("photos")
	  @ManyToOne
	  @JoinColumn(name = "propertyid", nullable = false)
	  private Property propertyid;

}
