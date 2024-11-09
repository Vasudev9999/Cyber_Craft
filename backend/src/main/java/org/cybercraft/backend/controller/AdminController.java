package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.service.AdminService;
import org.cybercraft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    // Helper method to extract token from Authorization header
    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    /**
     * Endpoint to get all orders. Accessible only by admin users.
     *
     * @param authHeader The Authorization header containing the JWT token.
     * @return List of orders or appropriate error message.
     */
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String token = extractToken(authHeader);
        if (token != null && userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            if (userService.isAdmin(username)) {
                List<Order> orders = adminService.getAllOrders();
                return ResponseEntity.ok(orders);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
    }

    /**
     * Endpoint to get profit data. Accessible only by admin users.
     *
     * @param authHeader The Authorization header containing the JWT token.
     * @return Map of profit data or appropriate error message.
     */
    @GetMapping("/profit")
    public ResponseEntity<?> getProfitData(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String token = extractToken(authHeader);
        if (token != null && userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            if (userService.isAdmin(username)) {
                Map<String, Double> profitData = adminService.getProfitData();
                return ResponseEntity.ok(profitData);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
    }

    /**
     * Endpoint to get statistics data. Accessible only by admin users.
     *
     * @param authHeader The Authorization header containing the JWT token.
     * @return Map of statistics data or appropriate error message.
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getStatisticsData(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String token = extractToken(authHeader);
        if (token != null && userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            if (userService.isAdmin(username)) {
                Map<String, Object> statisticsData = adminService.getStatisticsData();
                return ResponseEntity.ok(statisticsData);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
    }
}