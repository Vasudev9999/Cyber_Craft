package org.cybercraft.backend.repository;

import org.cybercraft.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE "
            + "(?1 IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%'))) "
            + "AND (?2 IS NULL OR LOWER(p.category) LIKE LOWER(CONCAT('%', ?2, '%'))) "
            + "AND (?3 IS NULL OR LOWER(p.processor) LIKE LOWER(CONCAT('%', ?3, '%'))) "
            + "AND (?4 IS NULL OR LOWER(p.ram) LIKE LOWER(CONCAT('%', ?4, '%'))) "
            + "AND (?5 IS NULL OR LOWER(p.graphicsCard) LIKE LOWER(CONCAT('%', ?5, '%'))) "
            + "AND (?6 IS NULL OR LOWER(p.storage) LIKE LOWER(CONCAT('%', ?6, '%'))) "
            + "AND (?7 IS NULL OR p.price >= ?7) "
            + "AND (?8 IS NULL OR p.price <= ?8)")
    List<Product> findProductsWithFilters(String name, String category, String processor, String ram,
                                          String graphicsCard, String storage, Double minPrice, Double maxPrice);
}
