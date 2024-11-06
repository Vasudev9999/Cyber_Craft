// src/main/java/org/cybercraft/backend/repository/OrderRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    Optional<Order> findByIdAndUser(Long id, User user);
}