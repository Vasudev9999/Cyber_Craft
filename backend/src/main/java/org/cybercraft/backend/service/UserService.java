// src/main/java/org/cybercraft/backend/service/UserService.java
package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = generateToken(user);
        user.setToken(token);
        return userRepository.save(user);
    }

    public boolean loginUser(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            String token = generateToken(user);
            user.setToken(token);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean isAdmin(String username) {
        User user = userRepository.findByUsername(username);
        return user != null && "admin".equalsIgnoreCase(user.getUsername());
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("isAdmin", isAdmin(user.getUsername()));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public User getUserFromToken(String token) {
        String username = getUsernameFromToken(token);
        if (username != null) {
            return userRepository.findByUsername(username);
        }
        return null;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}