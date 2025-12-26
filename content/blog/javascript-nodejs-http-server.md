---
title: "Tạo HTTP Server với Node.js"
date: "2025-01-12"
description: "Hướng dẫn tạo HTTP server đơn giản sử dụng Node.js để xử lý các HTTP requests"
tags: ["javascript", "nodejs", "http-server", "backend"]
---

## HTTP Module trong Node.js

Node.js cung cấp module `http` tích hợp sẵn để tạo HTTP server và client. Đây là cách đơn giản nhất để xây dựng web server bằng JavaScript.

## Server cơ bản

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Xin chào từ Node.js Server!</h1>');
});

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
```

## Xử lý các routes khác nhau

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // Route cho trang chủ
    if (path === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Trang chủ</h1><p>Chào mừng đến với Node.js Server</p>');
    }
    // Route cho API users
    else if (path === '/api/users' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify([
            { id: 1, name: 'Nguyễn Văn A' },
            { id: 2, name: 'Trần Thị B' }
        ]));
    }
    // Route không tìm thấy
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Không tìm thấy trang</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
```

## Xử lý POST Request

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/users') {
        let body = '';
        
        // Thu thập dữ liệu từ request
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        // Xử lý khi nhận xong dữ liệu
        req.on('end', () => {
            try {
                const userData = JSON.parse(body);
                console.log('Dữ liệu nhận được:', userData);
                
                res.writeHead(201, { 
                    'Content-Type': 'application/json; charset=utf-8' 
                });
                res.end(JSON.stringify({
                    message: 'Tạo user thành công',
                    data: userData
                }));
            } catch (error) {
                res.writeHead(400, { 
                    'Content-Type': 'application/json; charset=utf-8' 
                });
                res.end(JSON.stringify({ error: 'Dữ liệu không hợp lệ' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000);
```

## Sử dụng Express.js (Framework phổ biến)

Express.js làm cho việc tạo HTTP server dễ dàng hơn:

```javascript
const express = require('express');
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Route GET
app.get('/', (req, res) => {
    res.send('<h1>Trang chủ</h1>');
});

// Route GET với parameters
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: 'User ' + userId });
});

// Route POST
app.post('/api/users', (req, res) => {
    const userData = req.body;
    res.status(201).json({
        message: 'Tạo user thành công',
        data: userData
    });
});

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
```

## Kết luận

Node.js cung cấp khả năng tạo HTTP server mạnh mẽ. Bạn có thể bắt đầu với module `http` cơ bản hoặc sử dụng framework như Express.js để phát triển ứng dụng nhanh hơn.

