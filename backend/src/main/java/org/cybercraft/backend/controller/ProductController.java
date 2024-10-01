package org.cybercraft.backend.controller;

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
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
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
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get("src/assets/product-images/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            Map<String, String> response = new HashMap<>();
            response.put("path", "/assets/product-images/" + fileName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
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


//
//@RestController
//@RequestMapping("/api/products")
//public class ProductController {
//
//    @Autowired
//    private ProductService productService;
//
//    @PostMapping("/add")
//    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
//        Product savedProduct = productService.addProduct(product);
//        return ResponseEntity.ok(savedProduct);
//    }
//
//    @GetMapping("")
//    public ResponseEntity<List<Product>> getAllProducts() {
//        List<Product> products = productService.getAllProducts();
//        return ResponseEntity.ok(products);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
//        Product product = productService.getProductById(id);
//        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
//        Product product = productService.updateProduct(id, updatedProduct);
//        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
//    }
//    @PostMapping("/upload")
//    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
//        try {
//            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//            Path path = Paths.get("src/assets/product-images/" + fileName);
//            Files.createDirectories(path.getParent());
//            Files.write(path, file.getBytes());
//            Map<String, String> response = new HashMap<>();
//            response.put("path", "/assets/product-images/" + fileName);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
//        boolean deleted = productService.deleteProduct(id);
//        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
//    }
//
//    // Endpoint for filtering products based on multiple parameters
//    @GetMapping("/filter")
//    public ResponseEntity<List<Product>> filterProducts(
//            @RequestParam(required = false) String name,
//            @RequestParam(required = false) String category,
//            @RequestParam(required = false) String processor,
//            @RequestParam(required = false) String ram,
//            @RequestParam(required = false) String graphicsCard,
//            @RequestParam(required = false) String storage,
//            @RequestParam(required = false) Double minPrice,
//            @RequestParam(required = false) Double maxPrice) {
//
//        List<Product> products = productService.filterProducts(name, category, processor, ram, graphicsCard, storage, minPrice, maxPrice);
//        return ResponseEntity.ok(products);
//    }
//}
