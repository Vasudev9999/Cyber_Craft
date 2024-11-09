// src/main/java/org/cybercraft/backend/controller/AuthController.java
package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user, HttpSession session) {
        try {
            User registeredUser = userService.registerUser(user);
            session.setAttribute("token", registeredUser.getToken());
            Map<String, Object> response = new HashMap<>();
            response.put("username", registeredUser.getUsername());
            response.put("isAdmin", registeredUser.isAdmin());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user, HttpSession session) {
        boolean isAuthenticated = userService.loginUser(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            User loggedInUser = userService.userRepository.findByUsername(user.getUsername());
            Map<String, Object> response = new HashMap<>();
            response.put("username", loggedInUser.getUsername());
            response.put("isAdmin", loggedInUser.isAdmin());

            session.setAttribute("token", loggedInUser.getToken());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
        }
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            User user = userService.userRepository.findByUsername(username);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("isAdmin", user.isAdmin());
            response.put("cartItemCount", user.getCart() != null ? user.getCart().size() : 0);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid session");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }
}