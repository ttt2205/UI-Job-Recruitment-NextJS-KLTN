# Authentication

## 1. Login

### Description

Đăng nhập vào trang web bằng email và password.
Server sẽ xác thực tài khoản và trả về token với tên là accessToken vào cookie của browser.

- **Endpoint:**
  POST /api/v1/auth/login

- **Headers:**

```http
Authorization: ""
Content-Type: application/json
```

### 📌 Request Body

| Field    | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| email    | string | ✅ Yes   | Email đăng nhập    |
| password | string | ✅ Yes   | Mật khẩu tài khoản |

### 📌 Example Request

```json
{
  "email": "thanhtrung22052004@gmail.com",
  "password": "trung2205"
}
```

### 📌 Example Response Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful"
}
```

### 📌 Example Response Error

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password should not be empty"],
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

## 2. Logout

### Description

Đăng xuất accessToken ở browser của client.

- **Endpoint:**
  POST /api/v1/auth/logout

- **Headers:**

```http
Authorization: Bearer(token)
Content-Type: application/json
```

### 📌 Example Response Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Logged out successfully"
}
```

### 📌 Example Response Error

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password should not be empty"],
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

## 3. Get Account

### Description

Lấy thông tin tài khoản đăng nhập của user.
Có 3 loại người dùng admin, candidate, company.
Xác thực token thông qua cookie được gửi trong header của request.

- **Endpoint:**
  GET /api/v1/auth/account

- **Headers:**

```http
Authorization: Bearer(token)
Content-Type: application/json
```

### 📌 Payload Of JWT

```json
{
  "sub": "user_id_hoặc_uuid",
  "email": "example@gmail.com",
  "type": "candidate" "company" "admin",
  "iat": 1739635200, // issued at (tự động thêm)
  "exp": 1739642400, // expiry (tự động thêm)
  "aud": "your_audience_value",
  "iss": "your_issuer_value"
}
```

### 📌 Example Response Success

#### Trường hợp user là candidate

```json
{
  "userId": "64b1e9b7d8f1f0d9e0a4d1c7",
  "email": "john.doe@gmail.com",
  "type": "candidate",
  "data": {
    "id": "c12345",
    "name": "John Doe",
    "phone": "0987654321",
    "resumeUrl": "https://example.com/resume.pdf",
    "userId": "64b1e9b7d8f1f0d9e0a4d1c7"
  }
}
```

#### Trường hợp user là company:

```json
{
  "userId": "64b1e9b7d8f1f0d9e0a4d1c7",
  "email": "company@example.com",
  "type": "company",
  "data": {
    "id": "comp_001",
    "name": "TechSoft Co., Ltd",
    "website": "https://techsoft.vn",
    "address": "Hà Nội, Việt Nam",
    "userId": "64b1e9b7d8f1f0d9e0a4d1c7"
  }
}
```

#### Trường hợp user là admin:

```json

```

### 📌 Example Response Error

```json
{
  "statusCode": 401,
  "message": "Token has expired",
  "error": "Unauthorized"
}
```

```json
{
  "statusCode": 401,
  "message": "Invalid token",
  "error": "Unauthorized"
}
```

```json
{
  "statusCode": 400,
  "message": "Unsupported user type: admin",
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 500,
  "message": "AuthService.getAccount: Unexpected error occurred",
  "error": "Internal Server Error",
  "details": "Error stack trace hoặc message cụ thể"
}
```
