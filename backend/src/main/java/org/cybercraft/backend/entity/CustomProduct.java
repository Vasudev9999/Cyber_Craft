// src/main/java/org/cybercraft/backend/entity/CustomProduct.java
package org.cybercraft.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "custom_products")
public class CustomProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String category;

    private String processor;
    private String ram;
    private String graphicsCard;
    private String storage;
    private String imageUrl;

    private String cabinet;
    private String caseFan;
    private String cpuCooler;
    private String hdd;
    private String modCable;
    private String motherboard;
    private String powerSupply;
    private String ssd;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}