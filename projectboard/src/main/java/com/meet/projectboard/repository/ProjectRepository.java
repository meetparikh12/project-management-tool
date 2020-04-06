package com.meet.projectboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meet.projectboard.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	Project getByProjectIdentifier(String projectIdentifier);
}
