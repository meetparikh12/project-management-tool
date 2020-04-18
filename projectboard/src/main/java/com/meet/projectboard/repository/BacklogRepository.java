package com.meet.projectboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.meet.projectboard.model.Backlog;

@Repository 
public interface BacklogRepository extends JpaRepository<Backlog, Long>{

	Backlog findByProjectIdentifier(String projectIdentifier);
}
