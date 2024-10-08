package org.cybercraft.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.cybercraft.backend.entity.Product;
import org.cybercraft.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestParam("file") MultipartFile file, @RequestParam("product") String productJson) {
        try {
            // First, upload the image and get the image name
            String imageName = uploadImage(file).getBody().get("name");

            // Convert the product JSON string to Product object
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);

            // Set the imageUrl in the product
            product.setImageUrl(imageName); // Set the image name or path as required

            // Save product with imageUrl as the image name only
            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Path to store images
            String uploadDir = "C:\\Users\\pvasu\\OneDrive\\Desktop\\CyberCraft\\Frontend\\src\\assets\\product-images\\";
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Create the path for the file
            Path path = Paths.get(uploadDir + fileName);

            // Create directories if they don't exist
            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }

            // Write the file to the path
            Files.write(path, file.getBytes());

            Map<String, String> response = new HashMap<>();
            response.put("name", fileName); // Only return the image name

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String processor,
            @RequestParam(required = false) String ram,
            @RequestParam(required = false) String graphicsCard,
            @RequestParam(required = false) String storage,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        List<Product> products = productService.filterProducts(name, category, processor, ram, graphicsCard, storage, minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }
}
