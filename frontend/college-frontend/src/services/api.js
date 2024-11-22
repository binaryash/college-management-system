// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Authentication
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/token/`, {
            username,
            password
        });
        
        return {
            access: response.data.access,
            refresh: response.data.refresh
        };
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken
        });
        
        return {
            access: response.data.access
        };
    } catch (error) {
        throw error;
    }
};

// Faculty-related APIs
export const getFacultyDetails = async (token) => {
    try {
        // Get faculty profile
        const facultyResponse = await axios.get(`${BASE_URL}/faculty/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        
        // If faculty exists, fetch their students
        const facultyData = facultyResponse.data[0];
        
        // Fetch students for the faculty
        const studentsResponse = await axios.get(`${BASE_URL}/faculty/${facultyData.id}/my_students/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });

        // Add students to faculty data
        facultyData.students = studentsResponse.data;

        return facultyData;
    } catch (error) {
        throw error;
    }
};

export const createFaculty = async (token, facultyData) => {
    try {
        const response = await axios.post(`${BASE_URL}/faculty/`, facultyData, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addStudentToSubject = async (token, facultyId, subjectId, studentId) => {
    try {
        const response = await axios.post(`${BASE_URL}/faculty/${facultyId}/add_student/`, {
            subject_id: subjectId,
            student_id: studentId
        }, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Student-related APIs
export const getStudentDetails = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/students/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        
        // Get first student (assuming it's the logged-in user)
        const studentData = response.data[0];
        
        // Fetch student's subjects
        const subjectsResponse = await axios.get(`${BASE_URL}/students/${studentData.id}/my_subjects/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });

        // Add subjects to student data
        studentData.subjects = subjectsResponse.data;

        return studentData;
    } catch (error) {
        throw error;
    }
};


// Function to create a student via the API

// Assuming the token is stored in localStorage (change according to your actual storage method)
const getAuthToken = () => {
  return localStorage.getItem('auth_token');  // Replace with your actual method of fetching the token
};

export const createStudent = async (formData) => {
  try {
    // Get the authentication token (if available)
    const token = getAuthToken();

    // Make sure the token is available, if not, handle the error accordingly
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    // Send the POST request with the Authorization header
    const response = await axios.post('http://127.0.0.1:8000/api/students/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensure we are sending FormData correctly
        'Authorization': `Bearer ${token}`,    // Send token in Authorization header
      },
    });

    return response;  // Return the response from the API
  } catch (error) {
    // Handle error (like missing token or invalid credentials)
    throw error;
  }
};



// Subject-related APIs
export const getSubjects = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/subjects/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createSubject = async (token, subjectData) => {
    try {
        const response = await axios.post(`${BASE_URL}/subjects/`, subjectData, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Generic CRUD operations
export const getItem = async (token, endpoint, id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}/${id}/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateItem = async (token, endpoint, id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}/${id}/`, data, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteItem = async (token, endpoint, id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}/`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    login,
    refreshToken,
    getFacultyDetails,
    createFaculty,
    addStudentToSubject,
    getStudentDetails,
    createStudent,
    getSubjects,
    createSubject,
    getItem,
    updateItem,
    deleteItem
};