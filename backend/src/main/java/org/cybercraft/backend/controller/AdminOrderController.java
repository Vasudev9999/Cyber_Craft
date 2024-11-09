// src/main/java/org/cybercraft/backend/controller/AdminOrderController.java
package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.service.OrderService;
import org.cybercraft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    // Get all orders for admin
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token) && userService.isAdmin(userService.getUsernameFromToken(token))) {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        }
        return ResponseEntity.status(403).build();
    }

    // Mark order as completed
    @PostMapping("/complete/{orderId}")
    public ResponseEntity<Order> markOrderAsCompleted(@PathVariable Long orderId, HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token) && userService.isAdmin(userService.getUsernameFromToken(token))) {
            Order updatedOrder = orderService.markOrderAsCompleted(orderId);
            if (updatedOrder != null) {
                return ResponseEntity.ok(updatedOrder);
            } else {
                return ResponseEntity.status(404).build();
            }
        }
        return ResponseEntity.status(403).build();
    }
}