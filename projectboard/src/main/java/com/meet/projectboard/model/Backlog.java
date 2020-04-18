package com.meet.projectboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="backlog")
@Entity
public class Backlog {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer PTSequence = 0;
	private String projectIdentifier;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getPTSequence() {
		return PTSequence;
	}
	public void setPTSequence(Integer pTSequence) {
		PTSequence = pTSequence;
	}
	public String getProjectIdentifier() {
		return projectIdentifier;
	}
	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}
	
	
}
