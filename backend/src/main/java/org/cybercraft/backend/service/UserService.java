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
    private Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    /**
     * Registers a new user by encoding the password and generating a JWT token.
     *
     * @param user The User entity to register.
     * @return The saved User entity with encoded password and token.
     */
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = generateToken(user);
        user.setToken(token);
        return userRepository.save(user);
    }

    /**
     * Authenticates a user by verifying the username and password.
     * Generates a new JWT token upon successful authentication.
     *
     * @param username    The username of the user.
     * @param rawPassword The raw password provided by the user.
     * @return True if authentication is successful, else false.
     */
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

    /**
     * Checks if a given username belongs to an admin user.
     *
     * @param username The username to check.
     * @return True if the user is an admin, else false.
     */
    public boolean isAdmin(String username) {
        User user = userRepository.findByUsername(username);
        return user != null && user.isAdmin();
    }

    /**
     * Generates a JWT token for a given user, including the isAdmin claim.
     *
     * @param user The User entity.
     * @return The generated JWT token as a String.
     */
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("isAdmin", isAdmin(user.getUsername()));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours validity
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Validates a JWT token.
     *
     * @param token The JWT token to validate.
     * @return True if the token is valid, else false.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extracts the username from a JWT token.
     *
     * @param token The JWT token.
     * @return The username if token is valid, else null.
     */
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

    /**
     * Retrieves a User entity based on the JWT token.
     *
     * @param token The JWT token.
     * @return The User entity if token is valid, else null.
     */
    public User getUserFromToken(String token) {
        String username = getUsernameFromToken(token);
        if (username != null) {
            return userRepository.findByUsername(username);
        }
        return null;
    }

    /**
     * Retrieves a User entity by their ID.
     *
     * @param userId The ID of the user.
     * @return The User entity if found, else null.
     */
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}