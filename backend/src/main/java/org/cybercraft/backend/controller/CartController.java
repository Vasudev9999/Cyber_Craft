// CartController.java
package org.cybercraft.backend.controller;

import org.cybercraft.backend.entity.CartItem;
import org.cybercraft.backend.entity.Product;
import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.CartItemRepository;
import org.cybercraft.backend.repository.ProductRepository;
import org.cybercraft.backend.repository.UserRepository;
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
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam Long productId, @RequestParam int quantity, HttpSession session) {
        String token = (String) session.getAttribute("token");
        if (userService.validateToken(token)) {
            String username = userService.getUsernameFromToken(token);
            User user = userRepository.findByUsername(username);
            Product product = productRepository.findById(productId).orElse(null);

            if (product == null) {
                return ResponseEntity.badRequest().body("Product not found");
            }

            // Check if the product is already in the cart
            List<CartItem> userCartItems = cartItemRepository.findByUser(user);
            CartItem existingItem = userCartItems.stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            if (existingItem != null) {
                // Update quantity if the item already exists
                existingItem.setQuantity(existingItem.getQuantity() + quantity);
                cartItemRepository.save(existingItem);
            } else {
                // Add new cart item
                CartItem cartItem = new CartItem();
                cartItem.setProduct(product);
                cartItem.setQuantity(quantity);
                cartItem.setUser(user);
                cartItemRepository.save(cartItem);
            }

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