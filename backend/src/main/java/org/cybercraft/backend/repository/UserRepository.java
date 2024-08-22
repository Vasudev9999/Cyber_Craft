// src/main/java/org/cybercraft/backend/repository/UserRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

