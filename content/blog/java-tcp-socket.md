---
title: "Lập trình TCP/IP Socket nâng cao với Java"
date: "2025-01-11"
description: "Tìm hiểu sâu về TCP/IP socket programming, xử lý đa luồng và các kỹ thuật nâng cao"
tags: ["java", "tcp", "socket", "multithreading"]
---

## TCP vs UDP

TCP (Transmission Control Protocol) là giao thức hướng kết nối, đảm bảo dữ liệu được gửi đến đúng địa chỉ và theo thứ tự. UDP (User Datagram Protocol) là giao thức không kết nối, nhanh hơn nhưng không đảm bảo thứ tự.

## Server đa luồng (Multi-threaded Server)

Để server có thể xử lý nhiều client đồng thời, ta cần sử dụng đa luồng:

```java
import java.io.*;
import java.net.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MultiThreadedServer {
    private static final int PORT = 8080;
    private static final int MAX_CLIENTS = 10;
    
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(MAX_CLIENTS);
        
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Server đang lắng nghe trên port " + PORT);
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client mới kết nối: " + 
                    clientSocket.getInetAddress());
                
                // Xử lý mỗi client trong một thread riêng
                executor.submit(new ClientHandler(clientSocket));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class ClientHandler implements Runnable {
    private Socket clientSocket;
    
    public ClientHandler(Socket socket) {
        this.clientSocket = socket;
    }
    
    @Override
    public void run() {
        try {
            BufferedReader in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            PrintWriter out = new PrintWriter(
                clientSocket.getOutputStream(), true
            );
            
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Nhận từ client: " + inputLine);
                
                // Xử lý message và phản hồi
                String response = "Echo: " + inputLine;
                out.println(response);
                
                if ("quit".equalsIgnoreCase(inputLine)) {
                    break;
                }
            }
            
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Client với GUI

Tạo client có giao diện đơn giản:

```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.net.*;

public class ChatClient extends JFrame {
    private Socket socket;
    private PrintWriter out;
    private BufferedReader in;
    private JTextArea chatArea;
    private JTextField messageField;
    
    public ChatClient() {
        initializeGUI();
        connectToServer();
    }
    
    private void initializeGUI() {
        setTitle("TCP Chat Client");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        chatArea = new JTextArea();
        chatArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(chatArea);
        
        messageField = new JTextField();
        JButton sendButton = new JButton("Gửi");
        
        sendButton.addActionListener(e -> sendMessage());
        messageField.addActionListener(e -> sendMessage());
        
        setLayout(new BorderLayout());
        add(scrollPane, BorderLayout.CENTER);
        
        JPanel bottomPanel = new JPanel(new BorderLayout());
        bottomPanel.add(messageField, BorderLayout.CENTER);
        bottomPanel.add(sendButton, BorderLayout.EAST);
        add(bottomPanel, BorderLayout.SOUTH);
    }
    
    private void connectToServer() {
        try {
            socket = new Socket("localhost", 8080);
            out = new PrintWriter(socket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            
            // Thread để nhận messages từ server
            new Thread(() -> {
                try {
                    String response;
                    while ((response = in.readLine()) != null) {
                        chatArea.append("Server: " + response + "\n");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this, 
                "Không thể kết nối đến server");
        }
    }
    
    private void sendMessage() {
        String message = messageField.getText();
        if (!message.isEmpty()) {
            out.println(message);
            chatArea.append("Bạn: " + message + "\n");
            messageField.setText("");
        }
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new ChatClient().setVisible(true));
    }
}
```

## Xử lý lỗi và timeout

```java
public class RobustSocketClient {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket();
            
            // Set timeout cho kết nối (5 giây)
            socket.connect(new InetSocketAddress("localhost", 8080), 5000);
            
            // Set timeout cho read (10 giây)
            socket.setSoTimeout(10000);
            
            // Bật TCP_NODELAY để giảm độ trễ
            socket.setTcpNoDelay(true);
            
            // Sử dụng socket...
            
        } catch (SocketTimeoutException e) {
            System.err.println("Timeout khi kết nối hoặc đọc dữ liệu");
        } catch (IOException e) {
            System.err.println("Lỗi I/O: " + e.getMessage());
        }
    }
}
```

## Kết luận

TCP/IP socket programming với Java cho phép xây dựng ứng dụng mạng mạnh mẽ. Sử dụng đa luồng giúp server xử lý nhiều client đồng thời, tạo nền tảng cho các ứng dụng chat, game online, và hệ thống phân tán.

