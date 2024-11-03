// User.java
package org.cybercraft.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(nullable = false)
    private String password;

    private String email;

    @Transient // Exclude from serialization
    private String token; // For storing JWT after login

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore // Added to prevent infinite recursion
    private List<CartItem> cart;
}