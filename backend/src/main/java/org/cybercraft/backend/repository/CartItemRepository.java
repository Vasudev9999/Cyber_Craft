// src/main/java/org/cybercraft/backend/repository/CartItemRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.CartItem;
import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
}