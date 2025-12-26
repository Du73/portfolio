---
title: "JavaScript Fetch API - Giao tiếp HTTP trong trình duyệt"
date: "2025-01-14"
description: "Tìm hiểu cách sử dụng Fetch API để thực hiện các HTTP requests trong JavaScript"
tags: ["javascript", "fetch", "http", "api"]
---

## Fetch API là gì?

Fetch API là một giao diện hiện đại trong JavaScript cho phép thực hiện các HTTP requests. Nó thay thế XMLHttpRequest (XHR) với cú pháp đơn giản và hỗ trợ Promise.

## Cú pháp cơ bản

```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## GET Request

```javascript
// Lấy dữ liệu từ API
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dữ liệu nhận được:', data);
  })
  .catch(error => {
    console.error('Có lỗi xảy ra:', error);
  });
```

## POST Request

```javascript
// Gửi dữ liệu lên server
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Kết quả:', data);
  });
```

## Sử dụng async/await

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Không tìm thấy user');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

// Sử dụng
fetchUserData(123).then(user => {
  console.log(user);
});
```

## Xử lý lỗi

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (response.status === 404) {
      throw new Error('Không tìm thấy tài nguyên');
    }
    if (response.status === 500) {
      throw new Error('Lỗi server');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Lỗi:', error.message);
  });
```

## Kết luận

Fetch API là công cụ mạnh mẽ và dễ sử dụng để thực hiện các HTTP requests trong JavaScript hiện đại, hỗ trợ tốt cho việc xây dựng ứng dụng web tương tác với API.

