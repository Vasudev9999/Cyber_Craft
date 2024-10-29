package org.cybercraft.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disabling CSRF for testing (enable in production)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/**", "/api/auth/register", "/api/auth/login", "/api/auth/**", "/api/products", "/api/products/add", "/api/auth/check-admin").permitAll() // Allow public access to register and login endpoints
                        .requestMatchers("/api/products/filter").permitAll() // Allow public access to filter endpoint
                        .anyRequest().authenticated() // All other endpoints require authentication
                )
                .sessionManagement(session -> session
                        .sessionFixation().none() // Do not create a new session upon login
                        .maximumSessions(1) // Allow only 1 session per user
                );
        return http.build();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }
}
