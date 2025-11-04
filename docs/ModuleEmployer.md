# Employer API

## 1. POST New Employer

### 🧾 Description

Tạo mới thông tin nhà tuyển dụng (Employer).

---

### 📌 Endpoint

```http
POST {{baseUrl}}/api/v1/employers
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Request Body

| Field           | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| userId          | number | ID của user (liên kết với bảng User)      |
| email           | string | Email của nhà tuyển dụng                   |
| name            | string | Tên công ty/nhà tuyển dụng                 |
| primaryIndustry | string | Ngành nghề chính                           |
| size            | string | Quy mô công ty (ví dụ: "10-50", "50-200") |
| foundedIn       | number | Năm thành lập                              |
| description     | string | Mô tả về công ty                           |
| phone           | string | Số điện thoại liên hệ                      |
| address         | string | Địa chỉ công ty                            |
| logo            | string | URL logo công ty                           |
| website         | string | Website công ty                            |
| country         | string | Quốc gia                                   |
| city            | string | Thành phố                                  |
| type            | string | DTO type (ví dụ: "CreateEmployerDto")     |

### 📌 Example Request Body

```json
{
  "userId": 123,
  "email": "contact@techcorp.vn",
  "name": "Công ty TNHH Công Nghệ TechCorp",
  "primaryIndustry": "Information Technology",
  "size": "50-200",
  "foundedIn": 2015,
  "description": "Công ty chuyên phát triển phần mềm và giải pháp công nghệ cho doanh nghiệp.",
  "phone": "+84-28-1234-5678",
  "address": "123 Đường Nguyễn Huệ, Quận 1",
  "logo": "https://example.com/logo.png",
  "website": "https://techcorp.vn",
  "country": "Vietnam",
  "city": "Ho Chi Minh City",
  "type": "CreateEmployerDto"
}
```

### 📌 Response Schema

| Field      | Type   | Description                  |
| ---------- | ------ | ---------------------------- |
| statusCode | number | Mã trạng thái HTTP           |
| message    | string | Thông báo kết quả            |
| data       | object | Thông tin employer vừa tạo   |

### 📌 Example Response

```json
{
  "statusCode": 201,
  "message": "Tạo nhà tuyển dụng thành công!",
  "data": {
    "id": 456,
    "userId": 123,
    "email": "contact@techcorp.vn",
    "name": "Công ty TNHH Công Nghệ TechCorp",
    "primaryIndustry": "Information Technology",
    "size": "50-200",
    "foundedIn": 2015,
    "description": "Công ty chuyên phát triển phần mềm và giải pháp công nghệ cho doanh nghiệp.",
    "phone": "+84-28-1234-5678",
    "address": "123 Đường Nguyễn Huệ, Quận 1",
    "logo": "https://example.com/logo.png",
    "website": "https://techcorp.vn",
    "country": "Vietnam",
    "city": "Ho Chi Minh City",
    "createdAt": "2025-10-24T08:00:00.000Z",
    "updatedAt": "2025-10-24T08:00:00.000Z"
  }
}
```

---

## 2. PATCH Employer

### 🧾 Description

Cập nhật thông tin nhà tuyển dụng đã tồn tại.

### 📌 Endpoint

```http
PATCH {{baseUrl}}/api/v1/employers/:id
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Request Body

| Field           | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| email           | string | Email của nhà tuyển dụng                   |
| name            | string | Tên công ty/nhà tuyển dụng                 |
| primaryIndustry | string | Ngành nghề chính                           |
| size            | string | Quy mô công ty (ví dụ: "10-50", "50-200") |
| foundedIn       | number | Năm thành lập                              |
| description     | string | Mô tả về công ty                           |
| phone           | string | Số điện thoại liên hệ                      |
| address         | string | Địa chỉ công ty                            |
| logo            | string | URL logo công ty                           |
| website         | string | Website công ty                            |
| country         | string | Quốc gia                                   |
| city            | string | Thành phố                                  |
| type            | string | DTO type (ví dụ: "UpdateEmployerDto")     |

### 📌 Example Request Body

```json
{
  "email": "info@techcorp.vn",
  "name": "Công ty TNHH Công Nghệ TechCorp Vietnam",
  "primaryIndustry": "Software Development",
  "size": "200-500",
  "foundedIn": 2015,
  "description": "Công ty hàng đầu về phát triển phần mềm và chuyển đổi số cho doanh nghiệp.",
  "phone": "+84-28-1234-9999",
  "address": "456 Đường Lê Lợi, Quận 1",
  "logo": "https://example.com/new-logo.png",
  "website": "https://techcorp.com.vn",
  "country": "Vietnam",
  "city": "Ho Chi Minh City",
  "type": "UpdateEmployerDto"
}
```

### 📌 Response Schema

| Field      | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| statusCode | number | Mã trạng thái HTTP                    |
| message    | string | Thông báo kết quả                     |
| data       | object | Thông tin employer đã được cập nhật   |

### 📌 Example Response

```json
{
  "statusCode": 200,
  "message": "Cập nhật nhà tuyển dụng thành công!",
  "data": {
    "id": 456,
    "userId": 123,
    "email": "info@techcorp.vn",
    "name": "Công ty TNHH Công Nghệ TechCorp Vietnam",
    "primaryIndustry": "Software Development",
    "size": "200-500",
    "foundedIn": 2015,
    "description": "Công ty hàng đầu về phát triển phần mềm và chuyển đổi số cho doanh nghiệp.",
    "phone": "+84-28-1234-9999",
    "address": "456 Đường Lê Lợi, Quận 1",
    "logo": "https://example.com/new-logo.png",
    "website": "https://techcorp.com.vn",
    "country": "Vietnam",
    "city": "Ho Chi Minh City",
    "createdAt": "2025-10-24T08:00:00.000Z",
    "updatedAt": "2025-10-24T10:30:00.000Z"
  }
}
```

---

## 3. DELETE Employer

### 🧾 Description

Xóa thông tin nhà tuyển dụng đã tồn tại.

### 📌 Endpoint

```http
DELETE {{baseUrl}}/api/v1/employers/:id
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Request Body

Không cần body. Chỉ cần cung cấp id của employer trong URL.

### 📌 Example Request

```http
DELETE {{baseUrl}}/api/v1/employers/456
Authorization: Bearer {{token}}
```

### 📌 Response Schema

| Field      | Type   | Description        |
| ---------- | ------ | ------------------ |
| statusCode | number | Mã trạng thái HTTP |
| message    | string | Thông báo kết quả  |

### 📌 Example Response

```json
{
  "statusCode": 200,
  "message": "Xóa nhà tuyển dụng thành công!"
}
```

---

## 4. GET Employer By ID

### 🧾 Description

Lấy thông tin chi tiết của một nhà tuyển dụng dựa theo ID.

### 📌 Endpoint

```http
GET {{baseUrl}}/api/v1/employers/:id
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Example Request

```http
GET {{baseUrl}}/api/v1/employers/456
Authorization: Bearer {{token}}
```

### 📌 Response Schema

| Field              | Type     | Description                       |
| ------------------ | -------- | --------------------------------- |
| statusCode         | number   | Mã trạng thái HTTP trả về         |
| message            | string   | Thông báo phản hồi từ server      |
| data               | object   | Thông tin chi tiết employer       |
| data.id            | number   | ID của employer                   |
| data.userId        | number   | ID của user liên kết              |
| data.email         | string   | Email của nhà tuyển dụng          |
| data.name          | string   | Tên công ty                       |
| data.primaryIndustry | string | Ngành nghề chính                  |
| data.size          | string   | Quy mô công ty                    |
| data.foundedIn     | number   | Năm thành lập                     |
| data.description   | string   | Mô tả về công ty                  |
| data.phone         | string   | Số điện thoại                     |
| data.address       | string   | Địa chỉ                           |
| data.logo          | string   | URL logo                          |
| data.website       | string   | Website                           |
| data.country       | string   | Quốc gia                          |
| data.city          | string   | Thành phố                         |
| data.createdAt     | string   | Thời gian tạo                     |
| data.updatedAt     | string   | Thời gian cập nhật gần nhất       |

### 📌 Example Response

```json
{
  "statusCode": 200,
  "message": "Lấy thông tin nhà tuyển dụng thành công!",
  "data": {
    "id": 456,
    "userId": 123,
    "email": "info@techcorp.vn",
    "name": "Công ty TNHH Công Nghệ TechCorp Vietnam",
    "primaryIndustry": "Software Development",
    "size": "200-500",
    "foundedIn": 2015,
    "description": "Công ty hàng đầu về phát triển phần mềm và chuyển đổi số cho doanh nghiệp.",
    "phone": "+84-28-1234-9999",
    "address": "456 Đường Lê Lợi, Quận 1",
    "logo": "https://example.com/new-logo.png",
    "website": "https://techcorp.com.vn",
    "country": "Vietnam",
    "city": "Ho Chi Minh City",
    "createdAt": "2025-10-24T08:00:00.000Z",
    "updatedAt": "2025-10-24T10:30:00.000Z"
  }
}
```

---

## 5. GET All Employers

### 🧾 Description

Lấy danh sách tất cả nhà tuyển dụng với phân trang.

### 📌 Endpoint

```http
GET {{baseUrl}}/api/v1/employers?page=1&limit=10
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Query Parameters

| Parameter | Type   | Description                      | Default |
| --------- | ------ | -------------------------------- | ------- |
| page      | number | Số trang                         | 1       |
| limit     | number | Số lượng kết quả mỗi trang       | 10      |

### 📌 Example Request

```http
GET {{baseUrl}}/api/v1/employers?page=1&limit=10
Authorization: Bearer {{token}}
```

### 📌 Response Schema

| Field      | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| statusCode | number | Mã trạng thái HTTP                    |
| message    | string | Thông báo phản hồi từ server          |
| data       | array  | Danh sách employers                   |
| pagination | object | Thông tin phân trang                  |
| pagination.page | number | Trang hiện tại                   |
| pagination.limit | number | Số lượng kết quả mỗi trang      |
| pagination.total | number | Tổng số employers                |

### 📌 Example Response

```json
{
  "statusCode": 200,
  "message": "Lấy danh sách nhà tuyển dụng thành công!",
  "data": [
    {
      "id": 456,
      "userId": 123,
      "email": "info@techcorp.vn",
      "name": "Công ty TNHH Công Nghệ TechCorp Vietnam",
      "primaryIndustry": "Software Development",
      "size": "200-500",
      "foundedIn": 2015,
      "description": "Công ty hàng đầu về phát triển phần mềm và chuyển đổi số cho doanh nghiệp.",
      "phone": "+84-28-1234-9999",
      "address": "456 Đường Lê Lợi, Quận 1",
      "logo": "https://example.com/new-logo.png",
      "website": "https://techcorp.com.vn",
      "country": "Vietnam",
      "city": "Ho Chi Minh City",
      "createdAt": "2025-10-24T08:00:00.000Z",
      "updatedAt": "2025-10-24T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```