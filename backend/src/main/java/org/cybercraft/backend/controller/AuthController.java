package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.Collections;
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
            session.setAttribute("username", registeredUser.getUsername()); // Set session attribute
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            System.err.println("Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user, HttpSession session) {
        boolean isAuthenticated = userService.loginUser(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            session.setAttribute("username", user.getUsername()); // Set session attribute
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("username", user.getUsername()); // Include the username in the response
            return ResponseEntity.ok(response); // Return a JSON response
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }

    @GetMapping("/check-admin")
    public ResponseEntity<Map<String, Boolean>> checkAdmin(HttpSession session) {
        String username = (String) session.getAttribute("username");
        boolean isAdmin = userService.isAdmin(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isAdmin", isAdmin);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate(); // Invalidate session
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            return ResponseEntity.ok(username); // Returning plain username
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
    }
}
