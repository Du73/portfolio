---
title: "Spring MVC và Routing - Điều hướng request trong Spring"
date: "2025-01-09"
description: "Tìm hiểu về Spring MVC, cách định nghĩa routes và xử lý các HTTP requests với annotations"
tags: ["java", "spring-mvc", "routing", "web-framework"]
---

## Spring MVC là gì?

Spring MVC (Model-View-Controller) là framework web mạnh mẽ của Java, giúp xây dựng ứng dụng web theo mô hình MVC. Nó cung cấp các annotation để mapping URLs với các phương thức xử lý.

## Cấu trúc cơ bản

### Controller

```java
package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {
    
    // GET /users
    @GetMapping
    public String listUsers(Model model) {
        model.addAttribute("users", userService.findAll());
        return "users/list"; // Trả về view
    }
    
    // GET /users/{id}
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "users/detail";
    }
    
    // GET /users/new - Hiển thị form tạo mới
    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("user", new User());
        return "users/form";
    }
    
    // POST /users - Xử lý tạo mới
    @PostMapping
    public String createUser(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/users"; // Redirect sau khi tạo
    }
    
    // GET /users/{id}/edit
    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "users/form";
    }
    
    // PUT /users/{id}
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id, 
                            @ModelAttribute User user) {
        userService.update(id, user);
        return "redirect:/users";
    }
    
    // DELETE /users/{id}
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return "redirect:/users";
    }
}
```

## @RequestMapping với các phương thức

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    // GET /api/products
    @RequestMapping(method = RequestMethod.GET)
    public List<Product> getAll() {
        return productService.findAll();
    }
    
    // POST /api/products
    @RequestMapping(method = RequestMethod.POST)
    public Product create(@RequestBody Product product) {
        return productService.save(product);
    }
    
    // GET /api/products/{id}
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Product getById(@PathVariable Long id) {
        return productService.findById(id);
    }
}
```

## Path Variables và Request Parameters

```java
@RestController
@RequestMapping("/api")
public class SearchController {
    
    // GET /api/search?keyword=java&page=1
    @GetMapping("/search")
    public ResponseEntity<?> search(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(required = false) String category
    ) {
        // Xử lý tìm kiếm
        return ResponseEntity.ok(results);
    }
    
    // GET /api/users/123/posts/456
    @GetMapping("/users/{userId}/posts/{postId}")
    public Post getPost(
        @PathVariable Long userId,
        @PathVariable Long postId
    ) {
        return postService.findByUserAndPost(userId, postId);
    }
}
```

## Request Body và Model Binding

```java
@RestController
public class OrderController {
    
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(
        @RequestBody OrderRequest request,
        @RequestHeader("Authorization") String authToken
    ) {
        // Validate token
        Order order = orderService.create(request);
        return ResponseEntity.status(201).body(order);
    }
    
    @PostMapping("/orders/form")
    public String createOrderFromForm(@ModelAttribute OrderRequest request) {
        // Xử lý form data
        orderService.create(request);
        return "redirect:/orders";
    }
}
```

## Exception Handling

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
        ResourceNotFoundException ex
    ) {
        ErrorResponse error = new ErrorResponse(
            404, 
            ex.getMessage()
        );
        return ResponseEntity.status(404).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        ErrorResponse error = new ErrorResponse(
            500, 
            "Lỗi server: " + ex.getMessage()
        );
        return ResponseEntity.status(500).body(error);
    }
}
```

## Kết luận

Spring MVC cung cấp các annotation mạnh mẽ để routing và xử lý requests. Với `@RequestMapping`, `@GetMapping`, `@PostMapping` và các annotation khác, bạn có thể xây dựng RESTful API và web application một cách có tổ chức và dễ bảo trì.

