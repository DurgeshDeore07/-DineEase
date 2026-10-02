package com.dineease.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dineease.backend.entity.Order;
import com.dineease.backend.repository.OrderRepository;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(
    origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://192.168.31.193:5500",
    "https://nickname-vermont-alberta-fiber.trycloudflare.com"
},
    allowedHeaders = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.OPTIONS
    }
)
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public order placeOrder(@RequestBody order order) {
        order.setStatus("Pending");
        return orderRepository.save(order);
    }

    @GetMapping
    public List<order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PutMapping("/{id}/confirm")
    public order confirmOrder(@PathVariable int id) {

        order order = orderRepository.findById(id).orElse(null);

        if (order != null) {
            order.setStatus("Confirmed");
            return orderRepository.save(order);
        }

        return null;
    }

    @PutMapping("/{id}/preparing")
    public order prepareOrder(@PathVariable int id) {

        order order = orderRepository.findById(id).orElse(null);

        if (order != null) {
            order.setStatus("Preparing");
            return orderRepository.save(order);
        }

        return null;
    }

    @PutMapping("/{id}/served")
    public order serveOrder(@PathVariable int id) {

        order order = orderRepository.findById(id).orElse(null);

        if (order != null) {
            order.setStatus("Served");
            return orderRepository.save(order);
        }

        return null;
    }
}
