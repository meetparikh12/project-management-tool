package com.meet.projectboard.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name="user")
@Entity
public class User implements UserDetails{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Email(message = "Username must be an email")
	@Column(unique = true)
	@NotBlank(message = "Username must not be blank")
	private String username;
	
	@NotBlank(message = "Please enter your full name")
	private String fullName;
	
	@NotBlank(message = "Password must not be blank")
	private String password;
	
	@Transient
	private String confirmPassword;
	
	@OneToMany( cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, orphanRemoval = true, mappedBy = "user")
	private List<Project> projects = new ArrayList<Project>();
	
	@JsonFormat(pattern="yyyy-mm-dd")
	@Column(updatable = false)
	private Date createdAt;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date updatedAt;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {return null;}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {return true;}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {return true;}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {return true;}

	@Override
	@JsonIgnore
	public boolean isEnabled() {return true;}
	
	
	
}
