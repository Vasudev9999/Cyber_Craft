package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a secure key

    public User registerUser(User user) {
        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Generate JWT token
        String token = generateToken(user);
        user.setToken(token);
        return userRepository.save(user);
    }

    public boolean loginUser(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        // Validate password using bcrypt
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            // Generate JWT
            String token = generateToken(user);
            user.setToken(token); // Store JWT in the user object

            // Save the user with the token in the database
            userRepository.save(user);

            return true;
        }
        return false;
    }

    public boolean isAdmin(String username) {
        User user = userRepository.findByUsername(username);
        return user != null && "admin".equals(user.getUsername());
    }

    // JWT token generation
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours validity
                .signWith(SECRET_KEY)
                .compact();
    }

    // JWT validation
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getSubject();
    }
}