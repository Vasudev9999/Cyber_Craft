// src/main/java/org/cybercraft/backend/controller/CartController.java
package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.*;
import org.cybercraft.backend.repository.*;
import org.cybercraft.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomProductRepository customProductRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam(required = false) Long productId,
                                            @RequestParam(required = false) Long customProductId,
                                            @RequestParam int quantity,
                                            HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            User user = userRepository.findByUsername(username);

            CartItem cartItem = new CartItem();
            cartItem.setQuantity(quantity);
            cartItem.setUser(user);

            if (productId != null) {
                Product product = productRepository.findById(productId).orElse(null);
                if (product == null) {
                    return ResponseEntity.badRequest().body("Product not found");
                }
                cartItem.setProduct(product);
            } else if (customProductId != null) {
                CustomProduct customProduct = customProductRepository.findById(customProductId).orElse(null);
                if (customProduct == null) {
                    return ResponseEntity.badRequest().body("Custom product not found");
                }
                cartItem.setCustomProduct(customProduct);
            } else {
                return ResponseEntity.badRequest().body("Product ID or Custom Product ID must be provided");
            }

            cartItemRepository.save(cartItem);
            return ResponseEntity.ok("Product added to cart");
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            User user = userRepository.findByUsername(username);
            List<CartItem> cartItems = cartItemRepository.findByUser(user);
            return ResponseEntity.ok(cartItems);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestParam Long itemId, HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token)) {
            cartItemRepository.deleteById(itemId);
            return ResponseEntity.ok("Item removed from cart");
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}