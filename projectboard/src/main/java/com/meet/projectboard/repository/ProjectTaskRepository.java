package com.meet.projectboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meet.projectboard.model.ProjectTask;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {
	
	ProjectTask getById(Long id);
	
	List<ProjectTask> findByProjectIdentifierOrderByPriority(String projectIdentifier);

}
