# College Management System

This is a full-stack College Management System built using **Django** for the backend and **React** for the frontend. The application allows faculty and students to interact with various features such as creating student profiles, managing subjects, and editing student information.

## Table of Contents

- [Backend (Django)](#backend-django)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
  - [Running the Backend](#running-the-backend)
- [Frontend (React)](#frontend-react)
  - [Installation](#installation-1)
  - [Running the Frontend](#running-the-frontend)
  - [Features](#features)
- [Contributing](#contributing)

---

## Backend (Django)

The backend is a Django-based API application that provides various endpoints for managing students, faculty, and subjects.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/college-management-system.git
   ```

2. Navigate to the `backend/college_management_backend` directory:
   ```bash
   cd backend/college_management_backend
   ```

3. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Apply migrations to set up the database:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser for the Django admin interface:
   ```bash
   python manage.py createsuperuser
   ```

### API Endpoints

- **Authentication:**
  - `POST /api/auth/login/` - Login using username and password, returns JWT token.
  
- **Faculty:**
  - `GET /api/faculty/` - Get a list of faculty members.
  - `GET /api/faculty/{id}/` - Get details of a specific faculty member.
  
- **Student:**
  - `GET /api/students/` - Get a list of students.
  - `GET /api/students/{id}/` - Get details of a specific student.
  - `POST /api/students/` - Create a new student profile.
  - `PATCH /api/students/{id}/` - Update an existing student's profile.

- **Subjects:**
  - `GET /api/subjects/` - Get a list of all subjects.
  - `POST /api/subjects/` - Create a new subject.
  - `GET /api/subjects/{id}/` - Get details of a specific subject.
  - `PATCH /api/subjects/{id}/` - Update a subject.

- **Student-Subject Management:**
  - `POST /api/student-subjects/` - Add a student to a subject.
  - `GET /api/student-subjects/{student_id}/` - Get all subjects assigned to a student.

### Running the Backend

1. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

   By default, the backend will be available at `http://127.0.0.1:8000/`.

2. To test the API, you can use tools like **Postman** or **curl** to interact with the API endpoints.

---

## Frontend (React)

The frontend is built using **React** and provides a user-friendly interface to interact with the backend API.

### Installation

1. Navigate to the `frontend/college` directory:
   ```bash
   cd frontend/college
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `frontend/college` directory and define the API base URL:
   ```bash
   REACT_APP_API_URL=http://127.0.0.1:8000/api
   ```

### Running the Frontend

1. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000/`.

2. Open the app in your browser and start interacting with the College Management System.

### Features

- **Login and Authentication:**
  - Faculty and students can log in using their credentials.
  - JWT authentication is used to authorize API requests.

- **Sidebar Navigation:**
  - The sidebar dynamically updates based on the logged-in user type (faculty or student).
  - Faculty can manage students, create new student profiles, and assign subjects to students.
  - Students can view and manage their subjects and edit their profiles.

- **Student Management:**
  - Faculty can create new student profiles and assign them to specific subjects.
  - Students can view and update their profiles.

- **Subject Management:**
  - Faculty can add students to subjects and manage the list of subjects.
  - Students can view the subjects they are enrolled in.

- **Responsive UI:**
  - The UI is designed to be responsive and works well on both desktop and mobile devices.

---

## Contributing

We welcome contributions! If you'd like to contribute to the project, feel free to open an issue or submit a pull request.

### Steps for Contributing:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your changes to your forked repository.
5. Open a pull request to the `main` branch.

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
