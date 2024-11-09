// src/main/java/org/cybercraft/backend/entity/Order.java
package org.cybercraft.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deliveryOption; // "Store Delivery" or "Home Delivery"

    private String address; // If Home Delivery

    private String paymentOption; // "Credit Card", "PayPal", "Cash on Delivery"

    private String paymentStatus; // "Pending", "Completed"

    private String deliveryStatus; // "Processing", "Shipped", "Delivered"

    private LocalDateTime orderedAt;

    private boolean completed; // New field to indicate if the order is completed

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OrderItem> orderItems;

    @PrePersist
    public void prePersist() {
        this.orderedAt = LocalDateTime.now();
        this.paymentStatus = "Pending";
        this.deliveryStatus = "Processing";
        this.completed = false; // Initialize as not completed
    }
}