package com.dineease.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dineease.backend.entity.Menu;
import com.dineease.backend.repository.MenuRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuRepository menuRepository;

    public MenuController(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @GetMapping
    public List<Menu> getAllMenu() {
        return menuRepository.findAll();
    }
}