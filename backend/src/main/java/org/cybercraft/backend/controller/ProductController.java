package org.cybercraft.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
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
            // Upload the image and get the image name
            String imageName = uploadImage(file).getBody().get("name");

            // Convert JSON string to Product object
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);
            product.setImageUrl(imageName);

            // Save product with image URL
            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Autowired
    private ProductService ProductService;

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                                 @RequestParam(value = "file", required = false) MultipartFile file,
                                                 @RequestParam("product") String productJson) {
        try {
            // Retrieve the existing product from the database
            Product existingProduct = productService.getProductById(id);
            if (existingProduct == null) {
                return ResponseEntity.notFound().build();
            }

            // Parse JSON and update fields selectively
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode productNode = objectMapper.readTree(productJson);

            // Update fields based on provided JSON data
            if (productNode.has("name")) {
                existingProduct.setName(productNode.get("name").asText());
            }
            if (productNode.has("description")) {
                existingProduct.setDescription(productNode.get("description").asText());
            }
            if (productNode.has("price")) {
                existingProduct.setPrice(productNode.get("price").asDouble());
            }
            if (productNode.has("category")) {
                existingProduct.setCategory(productNode.get("category").asText());
            }
            if (productNode.has("processor")) {
                existingProduct.setProcessor(productNode.get("processor").asText());
            }
            if (productNode.has("ram")) {
                existingProduct.setRam(productNode.get("ram").asText());
            }
            if (productNode.has("graphicsCard")) {
                existingProduct.setGraphicsCard(productNode.get("graphicsCard").asText());
            }
            if (productNode.has("storage")) {
                existingProduct.setStorage(productNode.get("storage").asText());
            }

            // Check if a new image file is provided and update image URL
            if (file != null && !file.isEmpty()) {
                String imageName = uploadImage(file).getBody().get("name");
                existingProduct.setImageUrl(imageName);
            }

            // Save updated product
            Product updatedProduct = productService.updateProduct(id, existingProduct);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "C:\\Users\\pvasu\\OneDrive\\Desktop\\CyberCraft\\Frontend\\src\\assets\\product-images\\";
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);

            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }

            Files.write(path, file.getBytes());
            Map<String, String> response = new HashMap<>();
            response.put("name", fileName);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("")
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String processor,
            @RequestParam(required = false) String graphicsCard,
            @RequestParam(required = false) String ram,
            @RequestParam(required = false) String storage,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String search) {
        List<Product> products = productService.getFilteredProducts(category, processor, graphicsCard, ram, storage, sortBy, search);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) throws Exception {
        Product product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}