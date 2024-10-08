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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user, HttpSession session) {
        try {
            User registeredUser = userService.registerUser(user);
            session.setAttribute("token", registeredUser.getToken()); // Store token in session
            return ResponseEntity.ok(registeredUser);
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
            response.put("message", "Login successful");
            response.put("username", loggedInUser.getUsername());
            response.put("token", loggedInUser.getToken()); // Return JWT token

            // Save token in session
            session.setAttribute("token", loggedInUser.getToken());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            return ResponseEntity.ok(username);
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