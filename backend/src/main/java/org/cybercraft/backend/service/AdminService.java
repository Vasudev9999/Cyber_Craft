package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setDeliveryStatus(status);
            if ("Delivered".equals(status)) {
                order.setCompleted(true);
            }
            return orderRepository.save(order);
        }
        return null;
    }

    @Transactional
    public Order updateOrderCompletion(Long orderId, boolean completed) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setCompleted(completed);
            return orderRepository.save(order);
        }
        return null;
    }
}