package com.dineease.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dineease.backend.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
}
