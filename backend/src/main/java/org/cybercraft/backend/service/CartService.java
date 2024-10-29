package org.cybercraft.backend.service;

import org.cybercraft.backend.entity.Cart;
import org.cybercraft.backend.entity.Product;
import org.cybercraft.backend.entity.User;
import org.cybercraft.backend.repository.CartRepository;
import org.cybercraft.backend.repository.ProductRepository;
import org.cybercraft.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart getCartByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }

    public Cart addProductToCart(Long userId, Long productId) {
        Cart cart = getCartByUserId(userId);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        cart.getProducts().add(product);
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public Cart removeProductFromCart(Long userId, Long productId) {
        Cart cart = getCartByUserId(userId);
        cart.getProducts().removeIf(product -> product.getId().equals(productId));
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getProducts().clear();
        cart.calculateTotalPrice();
        cartRepository.save(cart);
    }
}
