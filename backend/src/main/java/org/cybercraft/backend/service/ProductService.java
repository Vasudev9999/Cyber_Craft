package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.Product;
import org.cybercraft.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        if (productRepository.existsById(id)) {
            updatedProduct.setId(id);
            return productRepository.save(updatedProduct);
        }
        return null;
    }

    public List<Product> getFilteredProducts(String category, String processor, String graphicsCard, String ram, String storage, String sortBy, String search) {
        List<Product> products = productRepository.findAll();

        if (category != null && !category.isEmpty()) {
            products = products.stream().filter(p -> p.getCategory().equalsIgnoreCase(category)).collect(Collectors.toList());
        }
        if (processor != null && !processor.isEmpty()) {
            products = products.stream().filter(p -> {
                if (processor.equalsIgnoreCase("Intel")) {
                    return p.getProcessor().toLowerCase().contains("intel");
                } else if (processor.equalsIgnoreCase("AMD")) {
                    return p.getProcessor().toLowerCase().contains("amd");
                }
                return false;
            }).collect(Collectors.toList());
        }
        if (graphicsCard != null && !graphicsCard.isEmpty()) {
            products = products.stream().filter(p -> {
                if (graphicsCard.equalsIgnoreCase("NVIDIA")) {
                    return p.getGraphicsCard().toLowerCase().contains("nvidia");
                } else if (graphicsCard.equalsIgnoreCase("AMD")) {
                    return p.getGraphicsCard().toLowerCase().contains("amd");
                } else if (graphicsCard.equalsIgnoreCase("Integrated")) {
                    return p.getGraphicsCard().toLowerCase().contains("intel");
                }
                return false;
            }).collect(Collectors.toList());
        }
        if (ram != null && !ram.isEmpty()) {
            products = products.stream().filter(p -> p.getRam().equalsIgnoreCase(ram)).collect(Collectors.toList());
        }
        if (storage != null && !storage.isEmpty()) {
            products = products.stream().filter(p -> p.getStorage().equalsIgnoreCase(storage)).collect(Collectors.toList());
        }
        if (search != null && !search.isEmpty()) {
            products = products.stream().filter(p -> p.getName().toLowerCase().contains(search.toLowerCase())).collect(Collectors.toList());
        }
        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy) {
                case "date-asc":
                    products.sort((p1, p2) -> p1.getUpdatedAt().compareTo(p2.getUpdatedAt()));
                    break;
                case "date-desc":
                    products.sort((p1, p2) -> p2.getUpdatedAt().compareTo(p1.getUpdatedAt()));
                    break;
                case "price-asc":
                    products.sort((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()));
                    break;
                case "price-desc":
                    products.sort((p1, p2) -> Double.compare(p2.getPrice(), p1.getPrice()));
                    break;
            }
        }

        return products;
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
