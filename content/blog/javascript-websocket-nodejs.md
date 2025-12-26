---
title: "WebSocket trong Node.js - Giao tiếp real-time"
date: "2025-01-10"
description: "Học cách sử dụng WebSocket để tạo ứng dụng real-time với Node.js, giao tiếp hai chiều giữa client và server"
tags: ["javascript", "websocket", "nodejs", "realtime"]
---

## WebSocket là gì?

WebSocket là giao thức giao tiếp hai chiều (full-duplex) cho phép client và server trao đổi dữ liệu real-time mà không cần phải gửi HTTP request liên tục. Khác với HTTP, WebSocket duy trì kết nối mở.

## Cài đặt WebSocket với ws library

```bash
npm install ws
```

## Tạo WebSocket Server

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket Server đang chạy trên port 8080');

wss.on('connection', (ws) => {
    console.log('Client mới đã kết nối');
    
    // Gửi message chào mừng
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Chào mừng đến với WebSocket Server!'
    }));
    
    // Lắng nghe messages từ client
    ws.on('message', (message) => {
        console.log('Nhận được:', message.toString());
        
        try {
            const data = JSON.parse(message);
            
            // Xử lý các loại message khác nhau
            switch(data.type) {
                case 'chat':
                    // Broadcast message đến tất cả clients
                    wss.clients.forEach((client) => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'chat',
                                user: data.user,
                                message: data.message
                            }));
                        }
                    });
                    break;
                    
                case 'ping':
                    ws.send(JSON.stringify({ type: 'pong' }));
                    break;
            }
        } catch (error) {
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Dữ liệu không hợp lệ'
            }));
        }
    });
    
    // Xử lý khi client ngắt kết nối
    ws.on('close', () => {
        console.log('Client đã ngắt kết nối');
    });
    
    // Xử lý lỗi
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
```

## Tạo WebSocket Client (Browser)

```javascript
// Kết nối đến WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Khi kết nối thành công
ws.onopen = () => {
    console.log('Đã kết nối đến WebSocket server');
    
    // Gửi message chào mừng
    ws.send(JSON.stringify({
        type: 'chat',
        user: 'Nguyễn Văn A',
        message: 'Xin chào mọi người!'
    }));
};

// Nhận messages từ server
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    switch(data.type) {
        case 'welcome':
            console.log('Server:', data.message);
            break;
            
        case 'chat':
            displayMessage(data.user, data.message);
            break;
            
        case 'pong':
            console.log('Nhận pong từ server');
            break;
    }
};

// Xử lý lỗi
ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

// Khi ngắt kết nối
ws.onclose = () => {
    console.log('Đã ngắt kết nối');
};

// Hàm hiển thị message
function displayMessage(user, message) {
    const chatDiv = document.getElementById('chat');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
    chatDiv.appendChild(messageElement);
}

// Gửi message khi người dùng nhập
document.getElementById('sendButton').addEventListener('click', () => {
    const input = document.getElementById('messageInput');
    const message = input.value;
    
    if (message) {
        ws.send(JSON.stringify({
            type: 'chat',
            user: 'Nguyễn Văn A',
            message: message
        }));
        input.value = '';
    }
});
```

## Chat Application đơn giản

```javascript
// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws) => {
    const clientId = Math.random().toString(36).substring(7);
    clients.set(ws, clientId);
    
    console.log(`Client ${clientId} đã kết nối`);
    
    // Gửi ID cho client
    ws.send(JSON.stringify({
        type: 'connected',
        clientId: clientId
    }));
    
    // Broadcast khi có client mới
    broadcast({
        type: 'userJoined',
        clientId: clientId
    }, ws);
    
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        data.clientId = clientId;
        broadcast(data, ws);
    });
    
    ws.on('close', () => {
        const id = clients.get(ws);
        clients.delete(ws);
        broadcast({
            type: 'userLeft',
            clientId: id
        });
    });
});

function broadcast(data, sender) {
    clients.forEach((clientId, client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

server.listen(8080, () => {
    console.log('Server đang chạy trên http://localhost:8080');
});
```

## Kết luận

WebSocket là công cụ mạnh mẽ để xây dựng ứng dụng real-time như chat, game online, dashboard live data. Với Node.js và thư viện `ws`, bạn có thể tạo WebSocket server dễ dàng và hiệu quả.

