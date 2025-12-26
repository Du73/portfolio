---
title: "Java Socket Programming - Lập trình mạng cơ bản"
date: "2025-01-15"
description: "Hướng dẫn cơ bản về lập trình mạng với Java Socket, tạo server và client đơn giản"
tags: ["java", "socket", "network-programming"]
---

## Giới thiệu về Socket trong Java

Socket là cơ chế cho phép các ứng dụng Java giao tiếp qua mạng. Java cung cấp hai loại socket chính:
- **ServerSocket**: Dùng cho server để lắng nghe kết nối từ client
- **Socket**: Dùng cho client để kết nối đến server

## Tạo Server đơn giản

```java
import java.io.*;
import java.net.*;

public class SimpleServer {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(8080);
            System.out.println("Server đang lắng nghe trên port 8080...");
            
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client đã kết nối!");
            
            // Nhận dữ liệu từ client
            BufferedReader in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            String message = in.readLine();
            System.out.println("Client gửi: " + message);
            
            // Gửi phản hồi cho client
            PrintWriter out = new PrintWriter(
                clientSocket.getOutputStream(), true
            );
            out.println("Server đã nhận: " + message);
            
            clientSocket.close();
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Tạo Client đơn giản

```java
import java.io.*;
import java.net.*;

public class SimpleClient {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 8080);
            
            // Gửi dữ liệu đến server
            PrintWriter out = new PrintWriter(
                socket.getOutputStream(), true
            );
            out.println("Xin chào từ client!");
            
            // Nhận phản hồi từ server
            BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream())
            );
            String response = in.readLine();
            System.out.println("Server phản hồi: " + response);
            
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Kết luận

Socket programming là nền tảng của lập trình mạng trong Java. Hiểu cách sử dụng Socket và ServerSocket giúp bạn xây dựng các ứng dụng client-server mạnh mẽ.

