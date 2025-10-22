# Module Application

## 1. POST NEW APPLICATION

### 🧾 Description

Tạo mới một hồ sơ ứng tuyển công việc (Application).
Ứng viên chỉ được ứng tuyển một lần duy nhất cho mỗi công việc.
Hệ thống sẽ tự động sao chép file CV (resume) từ thư mục images/resumes sang images/applications khi tạo hồ sơ ứng tuyển mới.

### 📌 Endpoint

- **Endpoint:**
  POST /api/v1/application

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Request Body

| Field         | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `candidateId` | string | ✅ Yes   | ID của ứng viên thực hiện ứng tuyển            |
| `jobId`       | string | ✅ Yes   | ID của công việc mà ứng viên muốn ứng tuyển    |
| `resumeId`    | string | ✅ Yes   | ID của CV mà ứng viên chọn để nộp              |
| `coverLetter` | string | ❌ No    | Thư giới thiệu (nếu có) đi kèm hồ sơ ứng tuyển |

### 📌 Example Request Body

```json
{
  "candidateId": "670c9a91cf1bba4e24224a99",
  "jobId": "6710b133f2c31c231220cbbb",
  "resumeId": "670dfe02f2e55199b630f500",
  "coverLetter": "Tôi rất mong được tham gia vào vị trí này và đóng góp vào sự phát triển của công ty."
}
```

### 📌 Example Response — ✅ Thành công

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Ứng tuyển thành công!",
  "data": {
    "id": "6710cfee3cf2e8197c62b21b",
    "candidateId": "670c9a91cf1bba4e24224a99",
    "jobId": "6710b133f2c31c231220cbbb",
    "fileName": "cv_nguyenvana.pdf",
    "coverLetter": "Tôi rất mong được tham gia vào vị trí này và đóng góp vào sự phát triển của công ty.",
    "status": "PENDING",
    "createdAt": "2025-10-19T07:30:45.432Z",
    "updatedAt": "2025-10-19T07:30:45.432Z",
    "deletedAt": null
  }
}
```

### 📌 Example Response — ❌ Thất bại

```json
{
  "statusCode": 400,
  "message": [
    "Candidate ID is not empty!",
    "Job ID is not empty!",
    "Resume ID is not empty!"
  ],
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 404,
  "message": "Không tìm thấy ứng viên/công việc/hồ sơ phù hợp.",
  "error": "Not Found"
}
```

### 📌 Response Schema

| Field        | Type        | Description                      |
| ------------ | ----------- | -------------------------------- |
| `success`    | boolean     | Trạng thái thành công của API    |
| `statusCode` | number      | Mã trạng thái HTTP               |
| `message`    | string      | Thông điệp phản hồi              |
| `data`       | Application | Dữ liệu hồ sơ ứng tuyển được tạo |

#### Application Object

| Field         | Type              | Description                                                   |
| ------------- | ----------------- | ------------------------------------------------------------- | ---------------------------------- |
| `id`          | string            | ID của hồ sơ ứng tuyển                                        |
| `candidateId` | string            | ID của ứng viên thực hiện ứng tuyển                           |
| `jobId`       | string            | ID của công việc mà ứng viên đã ứng tuyển                     |
| `fileName`    | string            | Tên file CV được sao chép vào thư mục `images/applications`   |
| `coverLetter` | string            | Thư giới thiệu của ứng viên gửi kèm (nếu có)                  |
| `status`      | string            | Trạng thái ứng tuyển (`PENDING`, `APPROVED`, `REJECTED`, ...) |
| `createdAt`   | string (ISO Date) | Ngày giờ tạo hồ sơ ứng tuyển                                  |
| `updatedAt`   | string (ISO Date) | Ngày giờ cập nhật gần nhất                                    |
| `deletedAt`   | string            | null                                                          | Ngày giờ xóa (nếu đã bị xóa logic) |

## 2. CHECK APPLICATION OF CANDIDATE

### 🧾 Description

Kiểm tra thông tin ứng tuyển về vị trí công việc của ứng viên.

### 📌 Endpoint

- **Endpoint:**
  GET /api/v1/application/check?candidateId=&jobId=

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Query Params

| Field         | Type   | Required | Description                                 |
| ------------- | ------ | -------- | ------------------------------------------- |
| `candidateId` | string | ✅ Yes   | ID của ứng viên thực hiện ứng tuyển         |
| `jobId`       | string | ✅ Yes   | ID của công việc mà ứng viên muốn ứng tuyển |

### 📌 Example Response — ✅ Thành công

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Kiểm tra ứng tuyển thành công!",
  "data": {
    "hasApplied": true
  }
}
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Kiểm tra ứng tuyển thành công!",
  "data": {
    "hasApplied": false
  }
}
```

### 📌 Example Response — ❌ Thất bại

```json
{
  "statusCode": 400,
  "message": "Thiếu candidateId hoặc jobId trong query params",
  "error": "Bad Request"
}
```

## 3. GET APPLICATIONS BY CANDIDATE ID

### 🧾 Description

Lấy danh sách đơn ứng tuyển (application) của một ứng viên cụ thể trên trang Dashboard Candidate, có hỗ trợ phân trang và lọc theo trạng thái hoặc ngày đăng.

### 📌 Endpoint

- **Endpoint:**
  GET /api/v1/application/get-list/dashboard/candidate/:id

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Params

| Field | Type             | Required | Description                         |
| ----- | ---------------- | -------- | ----------------------------------- |
| `id`  | string or number | ✅ Yes   | ID của ứng viên thực hiện ứng tuyển |

| Field        | Type   | Required | Default | Description                                                                      |
| ------------ | ------ | -------- | ------- | -------------------------------------------------------------------------------- |
| `page`       | number | ❌ No    | 1       | Trang hiện tại của phân trang                                                    |
| `size`       | number | ❌ No    | 10      | Số lượng phần tử trên mỗi trang                                                  |
| `status`     | string | ❌ No    | all     | Lọc theo trạng thái ứng tuyển: '', `PENDING`, `REVIEWED`, `ACCEPTED`, `REJECTED` |
| `datePosted` | number | ❌ No    |         | Lọc theo số ngày kể từ ngày đăng bài (ví dụ: `7` = trong 7 ngày gần đây)         |

### 📌 Example Request

- **Endpoint:**
  GET /api/v1/application/get-list/dashboard/candidate/671fd8274e4b2e1c541dbd82?page=1&size=5&status=REVIEWED&datePosted=30

- **Headers:**

### 📌 Example Response — ✅ Thành công

```json
{
  "statusCode": 200,
  "message": "Lấy danh sách đơn ứng tuyển thành công!",
  "meta": {
    "totalItems": 12,
    "currentPage": 1,
    "pageSize": 5,
    "totalPages": 3
  },
  "results": [
    {
      "id": "671fe142f8a65e4e04c91aab",
      "fileName": "CV_NguyenVanA.pdf",
      "coverLetter": "Tôi rất quan tâm đến vị trí này...",
      "status": "REVIEWED",
      "createdAt": "2025-10-15T09:23:42.511Z",
      "job": {
        "id": "671fd9a13f2c9a3a04fdbd21",
        "jobTitle": "Frontend Developer",
        "country": "Vietnam",
        "city": "Ho Chi Minh",
        "location": "District 1, HCM",
        "datePosted": "2025-10-01T07:15:00.000Z",
        "expireDate": "2025-11-01T07:15:00.000Z",
        "status": true,
        "company": {
          "id": "671fd72a4e4b2e1c541dbcf1",
          "name": "TechSoft JSC",
          "email": "hr@techsoft.vn"
        },
        "logo": "https://cdn.example.com/company/logo/techsoft.png"
      }
    }
  ]
}
```

### 📌 Example Response — ❌ Thất bại

```json
{
  "statusCode": 400,
  "message": "Thiếu candidateId hoặc jobId trong query params",
  "error": "Bad Request"
}
```
