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

    /**
     * Create a new order.
     */
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

    /**
     * Get a specific order by ID for the authenticated user.
     */
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

    /**
     * Get all orders for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            User user = userService.getUserFromToken(token);
            List<Order> orders = orderService.getUserOrders(user);
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    /**
     * Update the payment status of an order.
     */
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

    /**
     * Fetch all orders. **No admin check for development purposes.**
     *
     * @return List of all orders.
     */
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            // Admin check removed for development
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    /**
     * Update the completion status of an order. **No admin check for development purposes.**
     *
     * @param orderId The ID of the order to update.
     * @param status  The new completion status.
     * @return The updated order.
     */
    @PostMapping("/{orderId}/complete")
    public ResponseEntity<Order> updateOrderCompletion(
            @PathVariable Long orderId,
            @RequestBody CompletionStatus status,
            HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (token != null && userService.validateToken(token)) {
            // Admin check removed for development
            Order updatedOrder = orderService.updateOrderCompletion(orderId, status.isCompleted());
            if (updatedOrder != null) {
                return ResponseEntity.ok(updatedOrder);
            } else {
                return ResponseEntity.status(404).build();
            }
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    /**
     * DTO for completion status.
     */
    public static class CompletionStatus {
        private boolean completed;

        public boolean isCompleted() {
            return completed;
        }

        public void setCompleted(boolean completed) {
            this.completed = completed;
        }
    }
}