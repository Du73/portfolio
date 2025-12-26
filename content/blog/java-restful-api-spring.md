---
title: "Xây dựng RESTful API với Spring Boot"
date: "2025-01-13"
description: "Hướng dẫn tạo RESTful API sử dụng Spring Boot cho ứng dụng web Java"
tags: ["java", "spring-boot", "rest-api", "backend"]
---

## RESTful API là gì?

REST (Representational State Transfer) là kiến trúc phần mềm cho các hệ thống phân tán. RESTful API sử dụng các phương thức HTTP (GET, POST, PUT, DELETE) để thao tác với tài nguyên.

## Tạo Spring Boot Project

Đầu tiên, tạo một Spring Boot project với các dependencies:
- Spring Web
- Spring Data JPA
- H2 Database (hoặc MySQL)

## Controller cơ bản

```java
package com.example.api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // Lấy danh sách tất cả users
        return ResponseEntity.ok(userService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.save(user);
        return ResponseEntity.status(201).body(createdUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id, 
        @RequestBody User user
    ) {
        User updatedUser = userService.update(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```

## Entity Model

```java
package com.example.api.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

## Service Layer

```java
package com.example.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
    
    public User update(Long id, User userDetails) {
        User user = findById(id);
        if (user != null) {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }
        return null;
    }
    
    public boolean delete(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
```

## Test API với Postman

Sau khi chạy ứng dụng, bạn có thể test các endpoints:
- `GET /api/users` - Lấy tất cả users
- `GET /api/users/1` - Lấy user có id = 1
- `POST /api/users` - Tạo user mới
- `PUT /api/users/1` - Cập nhật user có id = 1
- `DELETE /api/users/1` - Xóa user có id = 1

## Kết luận

Spring Boot giúp việc xây dựng RESTful API trở nên đơn giản và nhanh chóng. Với các annotation như `@RestController`, `@RequestMapping`, bạn có thể tạo API mạnh mẽ chỉ với vài dòng code.

