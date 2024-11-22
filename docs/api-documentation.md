# **College Management System API Documentation**

## **Table of Contents**

1. [Authentication](#authentication)
2. [Faculty Endpoints](#faculty-endpoints)
3. [Student Endpoints](#student-endpoints)
4. [Subject Endpoints](#subject-endpoints)
5. [Common Features for All Endpoints](#common-features-for-all-endpoints)
6. [Authorization Notes](#authorization-notes)
7. [Error Responses](#error-responses)

---

## **Base URL**

`/api/`

---

## **Authentication**

### **1. Obtain JWT Token**

**URL**: `POST /api/token/`

**Description**: Obtain JWT tokens for authentication.

**Input**:
```json
{
    "username": "string",
    "password": "string"
}
```

**Output**:
```json
{
    "access": "string",
    "refresh": "string"
}
```

---

### **2. Refresh JWT Token**

**URL**: `POST /api/token/refresh/`

**Description**: Refresh the JWT token using the refresh token.

**Input**:
```json
{
    "refresh": "string"
}
```

**Output**:
```json
{
    "access": "string"
}
```

---

## **Faculty Endpoints**

### **1. List All Faculty**

**URL**: `GET /api/faculty/`

**Auth**: Required

**Description**: Get a list of all faculty members.

**Output**:
```json
[
    {
        "id": "integer",
        "user": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "first_name": "string",
            "last_name": "string",
            "contact_number": "string"
        },
        "department": "string",
        "qualification": "string",
        "date_joined": "date",
        "subjects_taught": [
            {
                "id": "integer",
                "name": "string",
                "code": "string",
                "description": "string",
                "faculty": "integer",
                "faculty_name": "string"
            }
        ]
    }
]
```

---

### **2. Create Faculty**

**URL**: `POST /api/faculty/`

**Auth**: Required

**Description**: Create a new faculty member.

**Input**:
```json
{
    "user": {
        "username": "string",
        "email": "string",
        "password": "string",
        "first_name": "string",
        "last_name": "string",
        "contact_number": "string"
    },
    "department": "string",
    "qualification": "string"
}
```

**Output**: Same format as `List All Faculty`

---

### **3. Get Faculty's Students**

**URL**: `GET /api/faculty/{id}/my_students/`

**Auth**: Faculty only

**Description**: Get the list of students enrolled in the faculty's subjects.

**Output**:
```json
[
    {
        "id": "integer",
        "user": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "first_name": "string",
            "last_name": "string",
            "contact_number": "string"
        },
        "profile_pic": "string",
        "date_of_birth": "date",
        "gender": "string",
        "blood_group": "string",
        "address": "string",
        "enrollment_date": "date",
        "subjects": []
    }
]
```

---

### **4. Add Student to Faculty's Subject**

**URL**: `POST /api/faculty/{id}/add_student/`

**Auth**: Faculty only

**Description**: Add a student to a faculty's subject.

**Input**:
```json
{
    "subject_id": "integer",
    "student_id": "integer"
}
```

**Output**:
```json
{
    "detail": "Student added successfully"
}
```

---

## **Student Endpoints**

### **1. List All Students**

**URL**: `GET /api/students/`

**Auth**: Required

**Description**: Get a list of all students.

**Output**:
```json
[
    {
        "id": "integer",
        "user": {
            "id": "integer",
            "username": "string",
            "email": "string",
            "first_name": "string",
            "last_name": "string",
            "contact_number": "string"
        },
        "profile_pic": "string",
        "date_of_birth": "date",
        "gender": "string",
        "blood_group": "string",
        "address": "string",
        "enrollment_date": "date",
        "subjects": [
            {
                "id": "integer",
                "name": "string",
                "code": "string",
                "description": "string",
                "faculty": "integer",
                "faculty_name": "string"
            }
        ]
    }
]
```

---

### **2. Create Student**

**URL**: `POST /api/students/`

**Auth**: Required

**Description**: Create a new student.

**Input**:
```json
{
    "user": {
        "username": "string",
        "email": "string",
        "password": "string",
        "first_name": "string",
        "last_name": "string",
        "contact_number": "string"
    },
    "date_of_birth": "date",
    "gender": "string (M/F/O)",
    "blood_group": "string",
    "address": "string",
    "profile_pic": "file (optional)"
}
```

**Output**: Same format as `List All Students`

---

### **3. Get Student's Subjects**

**URL**: `GET /api/students/{id}/my_subjects/`

**Auth**: Required

**Description**: Get the list of subjects a student is enrolled in.

**Output**:
```json
[
    {
        "id": "integer",
        "name": "string",
        "code": "string",
        "description": "string",
        "faculty": "integer",
        "faculty_name": "string"
    }
]
```

---

## **Subject Endpoints**

### **1. List All Subjects**

**URL**: `GET /api/subjects/`

**Auth**: Required

**Description**: Get a list of all subjects.

**Output**:
```json
[
    {
        "id": "integer",
        "name": "string",
        "code": "string",
        "description": "string",
        "faculty": "integer",
        "faculty_name": "string"
    }
]
```

---

### **2. Create Subject**

**URL**: `POST /api/subjects/`

**Auth**: Faculty only

**Description**: Create a new subject.

**Input**:
```json
{
    "name": "string",
    "code": "string",
    "description": "string"
}
```

**Output**: Same format as `List All Subjects`

---

## **Common Features for All Endpoints**

### **1. Get Single Item**

**URL**: `GET /api/{endpoint}/{id}/`

**Description**: Retrieve a single item (faculty, student, or subject) by ID.

**Auth**: Required

**Output**: Single item in the same format as list endpoint.

---

### **2. Update Item**

**URL**: `PUT /api/{endpoint}/{id}/`

**Description**: Update an item (faculty, student, or subject).

**Auth**: Required

**Input**: Same format as the create endpoint.

**Output**: Updated item.

---

### **3. Delete Item**

**URL**: `DELETE /api/{endpoint}/{id}/`

**Description**: Delete an item (faculty, student, or subject).

**Auth**: Required

**Output**: HTTP 204 No Content.

---

## **Authorization Notes**

- **Admin Users**:
  - Full access to all endpoints.

- **Faculty Users**:
  - Can view/edit their own profile.
  - Can view students enrolled in their subjects.
  - Can manage their subjects.
  - Can add students to their subjects.

- **Student Users**:
  - Can view/edit their own profile.
  - Can view their enrolled subjects.
  - Cannot create or modify subjects.

---

## **Error Responses**

All endpoints may return the following error responses:

**General Error Response**:
```json
{
    "detail": "Error message"
}
```

**Common HTTP Status Codes**:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## **Update Student Documentation**

### **Endpoint:**

`PATCH http://localhost:8000/api/students/{student_id}/update_student/`

### **Method:**

`PATCH`

### **Description:**

This endpoint allows updating a student's details, including personal information and subjects.

### **URL Parameters:**

- `student_id`: The ID of the student to be updated.

### **Request Headers:**

- `Authorization`: Bearer token (JWT) required in the header for authentication.

**Example**:
```plaintext
Authorization: Bearer <Your-JWT-Token>
```

Certainly! Continuing from where we left off:

### **Request Body (Payload)**:

#### Example Request Body:
```json
{
  "user": {
    "username": "new_username", 
    "email": "new_email@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "contact_number": "+9876543210"
  },
  "profile_pic": "/student_profiles/new_image.jpg",
  "date_of_birth": "1998-12-15",
  "gender": "M",
  "blood_group": "A+",
  "address": "456 New Address, City, Country",
  "subjects": [
    {
      "id": 2,
      "name": "science",
      "code": "002",
      "faculty": 2,
      "faculty_name": "Dr. Jane Smith"
    }
  ]
}
```

#### **Fields**:

- **user** (object):
  - `username` (string): New username for the student (optional).
  - `email` (string): New email address (optional).
  - `first_name` (string): New first name (optional).
  - `last_name` (string): New last name (optional).
  - `contact_number` (string): New contact number (optional).

- **profile_pic** (string): URL or path to the new profile picture image (optional).

- **date_of_birth** (string, format: `YYYY-MM-DD`): New date of birth for the student (optional).

- **gender** (string): Gender of the student. Possible values: `"M"`, `"F"`, `"Other"` (optional).

- **blood_group** (string): Blood group of the student (optional).

- **address** (string): Updated address of the student (optional).

- **subjects** (array of objects): List of subjects associated with the student. Each subject object should contain:
  - `id` (integer): The unique ID of the subject.
  - `name` (string): The name of the subject.
  - `code` (string): The code of the subject.
  - `faculty` (integer): The faculty ID associated with the subject.
  - `faculty_name` (string): Name of the faculty teaching the subject.

---

### **Response:**

#### Success (200 OK):

If the update is successful, the response will contain the updated student object, including all fields that were modified.

**Example Response:**
```json
{
  "id": 1,
  "user": {
    "id": 3,
    "username": "new_username",
    "email": "new_email@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "contact_number": "+9876543210"
  },
  "profile_pic": "/student_profiles/new_image.jpg",
  "date_of_birth": "1998-12-15",
  "gender": "M",
  "blood_group": "A+",
  "address": "456 New Address, City, Country",
  "subjects": [
    {
      "id": 2,
      "name": "science",
      "code": "002",
      "faculty": 2,
      "faculty_name": "Dr. Jane Smith"
    }
  ],
  "enrollment_date": "2024-11-20"
}
```

#### Error (400 Bad Request):

If the request body is missing required fields or contains invalid data, the server will return a `400 Bad Request` response.

**Example Error Response:**
```json
{
  "error": "Invalid data format or missing fields"
}
```

#### Error (404 Not Found):

If the student ID does not exist or the student with the provided ID cannot be found, a `404 Not Found` error will be returned.

**Example Error Response:**
```json
{
  "error": "Student not found"
}
```

#### Error (401 Unauthorized):

If the request does not contain a valid JWT token in the `Authorization` header or the token is expired, a `401 Unauthorized` response will be returned.

**Example Error Response:**
```json
{
  "error": "Authentication required"
}
```

#### Error (500 Internal Server Error):

If an unexpected error occurs on the server while processing the request, a `500 Internal Server Error` will be returned.

**Example Error Response:**
```json
{
  "error": "An unexpected error occurred. Please try again later."
}
```

---

### **Response Codes:**

- **200 OK**: Successfully updated student information.
- **400 Bad Request**: Invalid or missing data in the request.
- **401 Unauthorized**: Missing or invalid authentication token.
- **404 Not Found**: The student with the specified `student_id` was not found.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## **Example Request using `axios`:**

```javascript
import axios from 'axios';

const updateStudent = async (studentId, studentData, token) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/students/${studentId}/update_student/`,
      studentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Student updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating student:', error.response ? error.response.data : error.message);
  }
};

// Example student data to update
const studentData = {
  user: {
    username: 'new_student_username',
    email: 'new_email@example.com',
    first_name: 'John',
    last_name: 'Doe',
    contact_number: '+9876543210'
  },
  profile_pic: '/student_profiles/new_image.jpg',
  date_of_birth: '1998-12-15',
  gender: 'M',
  blood_group: 'A+',
  address: '456 New Address, City, Country',
  subjects: [
    {
      id: 2,
      name: 'science',
      code: '002',
      faculty: 2,
      faculty_name: 'Dr. Jane Smith'
    }
  ]
};

// Example usage
updateStudent(1, studentData, 'your_jwt_token_here');
```

---

### **Summary**:

- **HTTP Method**: `PATCH`
- **URL**: `/api/students/{student_id}/update_student/`
- **Headers**: `Authorization: Bearer <JWT-Token>`
- **Request Body**: Optional fields for student profile, including `user` object and `subjects`.
- **Response**: Updated student information or error message if the update fails.
