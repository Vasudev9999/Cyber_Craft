// src/main/java/org/cybercraft/backend/service/OrderService.java
package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.CartItem;
import org.cybercraft.backend.entity.Order;
import org.cybercraft.backend.entity.OrderItem;
import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.CartItemRepository;
import org.cybercraft.backend.repository.OrderItemRepository;
import org.cybercraft.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Order createOrder(Long userId, String deliveryOption, String address, String paymentOption) {
        User user = userService.getUserById(userId);
        List<CartItem> cartItems = cartItemRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Cart is empty.");
        }

        // Initialize the Order object
        Order order = new Order();
        order.setUser(user);
        order.setDeliveryOption(deliveryOption);
        order.setAddress(address);
        order.setPaymentOption(paymentOption);

        // Save the Order and obtain the saved instance
        Order savedOrder = orderRepository.save(order);

        // Create OrderItems based on CartItems
        List<OrderItem> orderItems = cartItems.stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder); // Use savedOrder to ensure proper association
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        // Save all OrderItems
        orderItemRepository.saveAll(orderItems);

        // Remove all items from the cart after creating the order
        cartItemRepository.deleteAll(cartItems);

        // Associate the OrderItems with the saved Order
        savedOrder.setOrderItems(orderItems);

        return savedOrder;
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }

    public Order getOrderByIdAndUser(Long orderId, User user) {
        Optional<Order> optionalOrder = orderRepository.findByIdAndUser(orderId, user);
        return optionalOrder.orElse(null);
    }

    @Transactional
    public Order updatePaymentStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            if (!"Cash on Delivery".equalsIgnoreCase(order.getPaymentOption())) {
                order.setPaymentStatus(status);
                orderRepository.save(order);
            }
        }
        return order;
    }

    @Transactional
    public Order placeOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null && "Cash on Delivery".equalsIgnoreCase(order.getPaymentOption())) {
            order.setPaymentStatus("Completed");
            orderRepository.save(order);
        }
        return order;
    }
}