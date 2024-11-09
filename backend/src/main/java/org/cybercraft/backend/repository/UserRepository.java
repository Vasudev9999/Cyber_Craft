// src/main/java/org/cybercraft/backend/repository/UserRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Find a user by their username.
     *
     * @param username The username to search for.
     * @return The User entity if found, else null.
     */
    User findByUsername(String username);
}