// src/main/java/org/cybercraft/backend/repository/CustomProductRepository.java
package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.CustomProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomProductRepository extends JpaRepository<CustomProduct, Long> {
}