import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';

const BASE_URL = 'http://127.0.0.1:8000/api';

const StudentSubject = ({ token, userType, mode = 'view' }) => {
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        let response;
        if (userType === 'faculty') {
          response = await axios.get(`${BASE_URL}/faculty/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } else {
          response = await axios.get(`${BASE_URL}/students/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }
        setUserDetails(response.data[0]);
        fetchSubjects();
      } catch (err) {
        setError('Failed to fetch user details');
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, [token, userType]);

  // Fetch subjects based on user type
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      let response;
      if (userType === 'faculty') {
        response = await axios.get(`${BASE_URL}/subjects/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } else {
        response = await axios.get(`${BASE_URL}/students/${userDetails.id}/my_subjects/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      setSubjects(response.data);
    } catch (err) {
      setError('Failed to fetch subjects');
    }
    setLoading(false);
  };

  // Handle adding student to subject (for faculty)
  const handleAddStudentToSubject = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!userDetails) {
        throw new Error('Faculty details not found');
      }

      const response = await axios.post(
        `${BASE_URL}/faculty/${userDetails.id}/add_student/`, 
        {
          subject_id: subjectId,
          student_id: studentId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Student added to subject successfully');
      setOpenSnackbar(true);
      setSubjectId('');
      setStudentId('');
      fetchSubjects();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add student to subject');
    }
    setLoading(false);
  };

  // Render loading state
  if (loading) {
    return <CircularProgress />;
  }

  // Render for faculty in add mode
  if (userType === 'faculty' && mode === 'add') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, minHeight: '100vh' }}>
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>Add Student to Subject</Typography>
          <form onSubmit={handleAddStudentToSubject}>
            <FormControl fullWidth sx={{ mb: 2 }} size="small" variant="outlined">
              <InputLabel>Select Subject</InputLabel>
              <Select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                label="Select Subject"
                required
              >
                <MenuItem value="">Choose a Subject</MenuItem>
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Student ID"
              type="number"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
              required
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={loading}
              sx={{ py: 1 }}
            >
              {loading ? 'Adding...' : 'Add Student to Subject'}
            </Button>
          </form>

          {error && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              message={error}
            />
          )}

          {success && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              message={success}
            />
          )}
        </Box>
      </Box>
    );
  }

  // Render for both faculty and student in view mode
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          {userType === 'faculty' ? 'All Subjects' : 'My Subjects'}
        </Typography>
        {subjects.length === 0 ? (
          <Typography>No subjects found.</Typography>
        ) : (
          <Box>
            {subjects.map((subject) => (
              <Box key={subject.id} sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {subject.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">Code: {subject.code}</Typography>
                {subject.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {subject.description}
                  </Typography>
                )}
                {userType === 'faculty' && subject.faculty_name && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'textSecondary' }}>
                    Faculty: {subject.faculty_name}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StudentSubject;
