package com.dineease.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dineease.backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
