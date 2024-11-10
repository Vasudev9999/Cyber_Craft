package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByOrderedAtDesc(User user);

    Optional<Order> findByIdAndUser(Long orderId, User user);

    List<Order> findAll();

    List<Order> findByUser(User user); // Additional method
}