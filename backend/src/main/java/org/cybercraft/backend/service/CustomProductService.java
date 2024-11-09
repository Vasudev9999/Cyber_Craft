// src/main/java/org/cybercraft/backend/service/CustomProductService.java
package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.CustomProduct;
import org.cybercraft.backend.repository.CustomProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomProductService {

    @Autowired
    private CustomProductRepository customProductRepository;

    public CustomProduct addCustomProduct(CustomProduct customProduct) {
        return customProductRepository.save(customProduct);
    }

    public CustomProduct getCustomProductById(Long id) {
        return customProductRepository.findById(id).orElse(null);
    }
}