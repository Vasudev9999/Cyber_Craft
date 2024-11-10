package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> status) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, status.get("status"));
        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/orders/{orderId}/complete")
    public ResponseEntity<Order> updateOrderCompletion(
            @PathVariable Long orderId,
            @RequestBody Map<String, Boolean> status) {
        Order updatedOrder = orderService.updateOrderCompletion(orderId, status.get("completed"));
        return ResponseEntity.ok(updatedOrder);
    }
}