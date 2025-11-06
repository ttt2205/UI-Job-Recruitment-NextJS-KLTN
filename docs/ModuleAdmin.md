# Admin API

## 1. GET LIST PAGINATION CANDIDATE FOR ADMIN

### 🧾 Description

Lấy danh sách hồ sơ ứng viên có hỗ trợ phân trang, lọc, và tìm kiếm theo nhiều tiêu chí như tên, giới tính, vị trí, ngành nghề, trình độ, kinh nghiệm...

- **Endpoint:**
  GET /api/v1/admin/candidates?page=1&size=10

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Query Parameters

| Field  | Type    | Required | Description                                               |
| ------ | ------- | -------- | --------------------------------------------------------- |
| page   | number  | ✅ Yes   | Số trang hiện tại (bắt đầu từ `1`)                        |
| size   | number  | ✅ Yes   | Số lượng hồ sơ trên mỗi trang                             |
| sort   | string  | ❌ No    | Trường cần sắp xếp (`createdAt`, `name`, `hourlyRate`...) |
| search | string  | ❌ No    | Từ khóa tìm kiếm (theo tên, vị trí, ngành nghề)           |
| gender | string  | ❌ No    | Lọc theo giới tính (`male`, `female`, `other`)            |
| status | boolean | ❌ No    | Lọc theo trạng thái ("", `true`, `false`)                 |

### 📌 Example Response

```json
{
  "statusCode": 200,
  "message": "Lấy danh sách hồ sơ ứng viên phân trang cho admin thành công!",
  "results": [
    {
      "id": "686e953e9a1be3274b59919a",
      "avatar": "https://example.com/avatar.jpg",
      "name": "Tăng Thành Trung",
      "designation": "Backend Developer",
      "location": "Hồ Chí Minh",
      "country": "",
      "city": "",
      "hourlyRate": 30,
      "tags": ["JavaScript", "NestJS", "MongoDB"],
      "category": "Information Technology",
      "gender": "male",
      "createdAt": "2025-10-05T10:20:00.000Z",
      "status": false
    }
  ],
  "meta": {
    "totalItems": 2,
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

### 📌 Response Schema

| Field                 | Type    | Description                      |
| --------------------- | ------- | -------------------------------- |
| statusCode            | number  | Mã trạng thái HTTP               |
| message               | string  | Thông báo kết quả trả về         |
| results               | array   | Danh sách hồ sơ ứng viên         |
| results[].id          | string  | ID của ứng viên                  |
| results[].avatar      | string  | Ảnh đại diện                     |
| results[].name        | string  | Họ và tên ứng viên               |
| results[].designation | string  | Vị trí hoặc chức danh            |
| results[].location    | string  | Địa điểm làm việc                |
| results[].country     | string  | Quốc gia                         |
| results[].city        | string  | Thành phố                        |
| results[].hourlyRate  | number  | Mức lương theo giờ               |
| results[].tags        | array   | Danh sách kỹ năng của ứng viên   |
| results[].category    | string  | Ngành nghề hoặc lĩnh vực         |
| results[].gender      | string  | Giới tính của ứng viên           |
| results[].createdAt   | Date    | Ngày tạo hồ sơ                   |
| results[].status      | boolean | Trạng thái hiển thị của hồ sơ    |
| meta                  | object  | Thông tin phân trang             |
| meta.totalItems       | number  | Tổng số ứng viên                 |
| meta.currentPage      | number  | Trang hiện tại                   |
| meta.pageSize         | number  | Số lượng ứng viên trên mỗi trang |
| meta.totalPages       | number  | Tổng số trang                    |

## 2. GET DETAIL CANDIDATE BY ID FOR ADMIN

### 🧾 Description

Lấy thông tin chi tiết của một hồ sơ ứng viên (Candidate) theo candidateId.
API này trả về toàn bộ dữ liệu hồ sơ, bao gồm kỹ năng, trình độ, mức lương, mô tả, ngôn ngữ và các mạng xã hội liên kết.

### 📌 Endpoint

- **Endpoint:**
  GET /api/v1/admin/candidate/details/:id

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Path Parameter

| Field | Type            | Required | Description                                |
| ----- | --------------- | -------- | ------------------------------------------ |
| id    | string / number | ✅ Yes   | ID của ứng viên cần lấy thông tin chi tiết |

### 📌 Example Response — ✅ Thành công

```json
{
  "statusCode": 200,
  "message": "Lấy hồ sơ ứng viên theo id thành công!",
  "data": {
    "id": "68be91be9bf7f4178721d9fe",
    "userId": "686cb5b802a159956bb2a370",
    "avatar": "file-1757402215941-519300144.jpg",
    "name": "Tăng Thành Trung",
    "birthday": "2004-05-22T00:00:00.000Z",
    "designation": "Backend Developer",
    "location": "63/2 Tân Hóa",
    "country": "",
    "city": "",
    "hourlyRate": 0,
    "tags": ["JavaScript", "NestJS", "MongoDB"],
    "category": "Information Technology",
    "gender": "male",
    "createdAt": "2025-09-08T08:20:14.763Z",
    "experience": 0,
    "qualification": "Đại học",
    "currentSalary": "1,000,000 VND",
    "expectedSalary": "5,000,000 VND",
    "description": "Tôi là một lập trình viên backend với hơn 3 năm kinh nghiệm...",
    "languages": ["Tiếng Việt", "English"],
    "socialMedias": []
  }
}
```

### 📌 Response Schema

| Field               | Type         | Description                           |
| ------------------- | ------------ | ------------------------------------- |
| statusCode          | number       | Mã trạng thái HTTP                    |
| message             | string       | Thông báo kết quả                     |
| data                | object       | Thông tin chi tiết của ứng viên       |
| data.id             | string       | ID của ứng viên                       |
| data.userId         | string       | ID người dùng liên kết                |
| data.avatar         | string       | Ảnh đại diện của ứng viên             |
| data.name           | string       | Tên ứng viên                          |
| data.birthday       | Date or null | Ngày sinh nhật                        |
| data.designation    | string       | Chức danh hoặc vị trí hiện tại        |
| data.location       | string       | Địa điểm làm việc                     |
| data.hourlyRate     | number       | Mức lương theo giờ                    |
| data.tags           | array        | Danh sách kỹ năng                     |
| data.category       | string       | Ngành nghề hoặc lĩnh vực              |
| data.gender         | string       | Giới tính (`male`, `female`, `other`) |
| data.createdAt      | Date or null | Ngày tạo hồ sơ                        |
| data.experience     | number       | Số năm kinh nghiệm                    |
| data.qualification  | string       | Trình độ học vấn                      |
| data.currentSalary  | string       | Mức lương hiện tại                    |
| data.expectedSalary | string       | Mức lương mong muốn                   |
| data.description    | string       | Mô tả chi tiết về ứng viên            |
| data.language       | array        | Danh sách ngôn ngữ sử dụng            |
| data.socialMedias   | array        | Danh sách mạng xã hội liên kết        |

## 3. LOCK CANDIDATE

### 🧾 Description

Khóa hồ sơ ứng viên

### 📌 Endpoint

- **Endpoint:**
  PATCH /api/v1/admin/candidate/:id/lock

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Path Parameter

| Field | Type   | Required | Description                       |
| ----- | ------ | -------- | --------------------------------- |
| id    | string | ✅ Yes   | ID của hồ sơ ứng viên cần xóa mềm |

### 📌 Example Response — ✅ Thành công

```json
{
  "statusCode": 200,
  "message": "Khóa hồ sơ ứng viên thành công!"
}
```

## 4. GET LIST PAGINATION COMPANY FOR ADMIN

### 🧾 Description

Lấy danh sách công ty có phân trang, hỗ trợ tìm kiếm, sắp xếp và lọc theo các điều kiện như vị trí, ngành nghề, hoặc năm thành lập.

### 📌 Endpoint

- **Endpoint:**
  GET /api/v1/admin/companies?page=1&size=10&sort=&search=&location=&primaryIndustry=&foundationDateMin=1900&foundationDateMax=2025
  Content-Type: application/json

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Query Parameters

| Field  | Type    | Required | Description                               |
| ------ | ------- | -------- | ----------------------------------------- |
| page   | number  | ✅ Yes   | Trang hiện tại                            |
| size   | number  | ✅ Yes   | Số lượng bản ghi trên mỗi trang           |
| sort   | string  | ❌ No    | Trường cần sắp xếp (tùy chọn)             |
| search | string  | ❌ No    | Từ khóa tìm kiếm theo tên hoặc email      |
| status | boolean | ❌ No    | Lọc theo trạng thái ("", `true`, `false`) |

### 📌 Example Response — ✅ Thành công

```json
{
  "statusCode": 200,
  "message": "Lấy danh sách công ty phân trang cho admin thành công!",
  "results": [
    {
      "id": "68736afc61942cb6f1e0141c",
      "email": "VNP@company.com",
      "name": "Công ty TNHH Công Nghệ VNP",
      "primaryIndustry": "Infomation Technology",
      "size": "100 - 150",
      "foundedIn": 2015,
      "phone": "0987654321",
      "address": "Quận 2, TP.HCM",
      "jobNumber": 2,
      "logo": "file-1753588732487-4780477.jpg",
      "status": true,
      "createdAt": "2025-10-05T10:20:00.000Z"
    }
  ],
  "meta": {
    "totalItems": 1,
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

### 📌 Response Schema

| Field                     | Type    | Description           |
| ------------------------- | ------- | --------------------- |
| statusCode                | number  | Mã trạng thái HTTP    |
| message                   | string  | Thông báo kết quả     |
| results                   | array   | Danh sách công ty     |
| results[].id              | string  | ID công ty            |
| results[].name            | string  | Tên công ty           |
| results[].email           | string  | Email công ty         |
| results[].primaryIndustry | string  | Ngành nghề chính      |
| results[].size            | string  | Quy mô công ty        |
| results[].foundedIn       | number  | Năm thành lập         |
| results[].phone           | string  | Số điện thoại         |
| results[].address         | string  | Địa chỉ công ty       |
| results[].jobNumber       | number  | Số lượng công việc    |
| results[].logo            | string  | Ảnh đại diện          |
| results[].status          | boolean | Trạng thái hoạt động  |
| results[].createdAt       | Date    | Ngày đăng ký          |
| results[].socialMedias    | array   | Danh sách mạng xã hội |
| meta                      | object  | Thông tin phân trang  |
| meta.totalItems           | number  | Tổng số công ty       |
| meta.currentPage          | number  | Trang hiện tại        |
| meta.pageSize             | number  | Số lượng mỗi trang    |
| meta.totalPages           | number  | Tổng số trang         |

## 5. LOCK COMPANY

### 🧾 Description

Khóa hồ sơ doanh nghiệp

### 📌 Endpoint

- **Endpoint:**
  PATCH /api/v1/admin/company/:id/lock

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Path Parameter

| Field | Type   | Required | Description                       |
| ----- | ------ | -------- | --------------------------------- |
| id    | string | ✅ Yes   | ID của hồ sơ ứng viên cần xóa mềm |

### 📌 Example Response — ✅ Thành công

```json
{
  "statusCode": 200,
  "message": "Khóa hồ sơ doanh nghiệp thành công!"
}
```

## 6. GET LIST PAGINATION USER FOR ADMIN

### 🧾 Description

Lấy danh sách tài khoản người dùng

- **Endpoint:**
  GET /api/v1/admin/users?page=1&size=10

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Query Parameters

| Field  | Type    | Required | Description                                               |
| ------ | ------- | -------- | --------------------------------------------------------- |
| page   | number  | ✅ Yes   | Số trang hiện tại (bắt đầu từ `1`)                        |
| size   | number  | ✅ Yes   | Số lượng hồ sơ trên mỗi trang                             |
| sort   | string  | ❌ No    | Trường cần sắp xếp (`createdAt`, `name`, `hourlyRate`...) |
| search | string  | ❌ No    | Từ khóa tìm kiếm (theo email)                             |
| status | boolean | ❌ No    | Lọc theo trạng thái ("", `true`, `false`)                 |

### 📌 Example Response

```json
{
  "statusCode": 200,
  "message": "Lấy danh sách hồ sơ ứng viên phân trang cho admin thành công!",
  "results": [
    {
      "id": "686e953e9a1be3274b59919a",
      "email": "",
      "createdAt": "2025-10-05T10:20:00.000Z",
      "status": false
    }
  ],
  "meta": {
    "totalItems": 2,
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

## 7. LOCK ACCOUNT OF USER

### 🧾 Description

Khóa tài khoản người dùng

### 📌 Endpoint

- **Endpoint:**
  PATCH /api/v1/admin/user/:id/lock

- **Headers:**

```http
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 📌 Path Parameter

| Field | Type   | Required | Description                       |
| ----- | ------ | -------- | --------------------------------- |
| id    | string | ✅ Yes   | ID của hồ sơ ứng viên cần xóa mềm |

### 📌 Example Response — ✅ Thành công

```json
{
  "statusCode": 200,
  "message": "Khóa tài khoản thành công!"
}
```
