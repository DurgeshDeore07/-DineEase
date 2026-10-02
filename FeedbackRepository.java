package com.dineease.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dineease.backend.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}