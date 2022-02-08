package com.group1.forum.Repositories;

import com.group1.forum.Entities.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, Long> { }

