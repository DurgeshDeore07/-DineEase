package com.dineease.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dineease.backend.entity.order;

public interface OrderRepository extends JpaRepository<order, Integer> {
}
