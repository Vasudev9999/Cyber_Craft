// src/main/java/org/cybercraft/backend/repository/UserRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Optional<User> findById(Long id);
}