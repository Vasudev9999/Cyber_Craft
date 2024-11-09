// src/main/java/org/cybercraft/backend/controller/CustomProductController.java
package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.CustomProduct;
import org.cybercraft.backend.service.CustomProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/custom-products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CustomProductController {

    @Autowired
    private CustomProductService customProductService;

    @PostMapping("/add")
    public ResponseEntity<CustomProduct> addCustomProduct(@RequestBody CustomProduct customProduct) {
        customProduct.setCategory("Custom PC");
        customProduct.setCreatedAt(LocalDateTime.now());
        customProduct.setUpdatedAt(LocalDateTime.now());
        CustomProduct savedProduct = customProductService.addCustomProduct(customProduct);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomProduct> getCustomProduct(@PathVariable Long id) {
        CustomProduct customProduct = customProductService.getCustomProductById(id);
        if (customProduct != null) {
            return ResponseEntity.ok(customProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}