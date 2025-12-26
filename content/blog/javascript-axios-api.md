---
title: "Axios - Thư viện HTTP Client cho JavaScript"
date: "2025-01-08"
description: "Học cách sử dụng Axios để thực hiện HTTP requests, xử lý interceptors và error handling"
tags: ["javascript", "axios", "http-client", "api"]
---

## Axios là gì?

Axios là một thư viện HTTP client phổ biến cho JavaScript, hỗ trợ cả browser và Node.js. Nó cung cấp API đơn giản hơn Fetch và có nhiều tính năng mạnh mẽ như interceptors, automatic JSON transformation.

## Cài đặt

```bash
# npm
npm install axios

# hoặc sử dụng CDN
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

## GET Request

```javascript
// GET request đơn giản
axios.get('https://api.example.com/users')
  .then(response => {
    console.log('Dữ liệu:', response.data);
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
  })
  .catch(error => {
    console.error('Lỗi:', error);
  });

// Với async/await
async function fetchUsers() {
  try {
    const response = await axios.get('https://api.example.com/users');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy users:', error);
  }
}

// GET với parameters
axios.get('https://api.example.com/users', {
  params: {
    page: 1,
    limit: 10,
    search: 'java'
  }
})
  .then(response => console.log(response.data));
```

## POST Request

```javascript
// POST đơn giản
axios.post('https://api.example.com/users', {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  age: 25
})
  .then(response => {
    console.log('Tạo user thành công:', response.data);
  });

// POST với headers tùy chỉnh
axios.post('https://api.example.com/users', userData, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
});
```

## PUT và DELETE

```javascript
// PUT - Cập nhật
axios.put('https://api.example.com/users/1', {
  name: 'Nguyễn Văn B',
  email: 'nguyenvanb@example.com'
})
  .then(response => console.log('Cập nhật thành công'));

// DELETE - Xóa
axios.delete('https://api.example.com/users/1')
  .then(response => console.log('Xóa thành công'));

// PATCH - Cập nhật một phần
axios.patch('https://api.example.com/users/1', {
  name: 'Nguyễn Văn C'
});
```

## Axios Instance

Tạo instance tùy chỉnh để tái sử dụng:

```javascript
// Tạo axios instance
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Sử dụng instance
apiClient.get('/users')
  .then(response => console.log(response.data));

apiClient.post('/users', userData)
  .then(response => console.log(response.data));
```

## Interceptors

Interceptors cho phép xử lý requests và responses trước khi chúng được gửi/nhận:

```javascript
// Request interceptor
axios.interceptors.request.use(
  config => {
    // Thêm token vào mọi request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  response => {
    // Xử lý response thành công
    return response;
  },
  error => {
    // Xử lý lỗi
    if (error.response?.status === 401) {
      // Token hết hạn, đăng xuất
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Error Handling

```javascript
async function fetchData() {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server trả về status code lỗi
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // Request đã gửi nhưng không nhận được response
      console.error('Không nhận được response:', error.request);
    } else {
      // Lỗi khi setup request
      console.error('Error:', error.message);
    }
    throw error;
  }
}
```

## Concurrent Requests

```javascript
// Gửi nhiều requests đồng thời
async function fetchAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/posts'),
      axios.get('/api/comments')
    ]);
    
    return {
      users: users.data,
      posts: posts.data,
      comments: comments.data
    };
  } catch (error) {
    console.error('Lỗi:', error);
  }
}
```

## Kết luận

Axios là công cụ mạnh mẽ và linh hoạt để làm việc với HTTP requests trong JavaScript. Với các tính năng như interceptors, error handling tự động, và hỗ trợ async/await, nó giúp việc tương tác với API trở nên dễ dàng và hiệu quả hơn so với Fetch API thuần.

