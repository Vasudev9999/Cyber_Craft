// src/main/java/org/cybercraft/backend/controller/OrderController.java
package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.service.OrderService;
import org.cybercraft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(
            @RequestParam String deliveryOption,
            @RequestParam(required = false) String street,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String zipCode,
            @RequestParam String paymentOption,
            HttpSession session) {

        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            String address = deliveryOption.equals("Home Delivery")
                    ? String.join(", ", street, city, state, zipCode)
                    : "Store Pickup";
            Order order = orderService.createOrder(user.getId(), deliveryOption, address, paymentOption);
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId, HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            Order order = orderService.getOrderByIdAndUser(orderId, user);
            return order != null ? ResponseEntity.ok(order) : ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            List<Order> orders = orderService.getUserOrders(user);
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/update-payment")
    public ResponseEntity<Order> updatePaymentStatus(
            @RequestParam Long orderId,
            @RequestParam String status,
            HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            Order order = orderService.getOrderByIdAndUser(orderId, user);
            if (order != null) {
                Order updatedOrder = orderService.updatePaymentStatus(orderId, status);
                return ResponseEntity.ok(updatedOrder);
            } else {
                return ResponseEntity.status(404).build();
            }
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    // Admin endpoint to get all orders
    @GetMapping("/admin/all")
    public ResponseEntity<List<Order>> getAllOrdersAdmin(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            if (user.isAdmin()) {
                List<Order> orders = orderService.getAllOrders();
                return ResponseEntity.ok(orders);
            }
        }
        return ResponseEntity.status(401).build();
    }

    // Admin endpoint to mark order as completed
    @PostMapping("/admin/complete/{orderId}")
    public ResponseEntity<Order> markOrderAsCompleted(@PathVariable Long orderId, HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            if (user.isAdmin()) {
                Order updatedOrder = orderService.markOrderAsCompleted(orderId);
                if (updatedOrder != null) {
                    return ResponseEntity.ok(updatedOrder);
                } else {
                    return ResponseEntity.status(404).build();
                }
            }
        }
        return ResponseEntity.status(401).build();
    }
}