// src/main/java/org/cybercraft/backend/service/UserService.java
/*package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        System.out.println("Registering user: " + user.getUsername());
        return userRepository.save(user);
    }

    public boolean loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        System.out.println("User found: " + (user != null));
        return user != null && user.getPassword().equals(password);
    }

}*/
package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Save user with plain text password
        return userRepository.save(user);
    }

    public boolean loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        // Compare passwords directly
        return user != null && user.getPassword().equals(password);
    }
}

