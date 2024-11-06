// src/main/java/org/cybercraft/backend/repository/OrderItemRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}