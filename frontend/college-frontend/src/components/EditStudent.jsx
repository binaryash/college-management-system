import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const EditStudent = ({ studentId, accessToken }) => {
  const [formData, setFormData] = useState({
    user: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      contact_number: ''
    },
    profile_pic: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    address: '',
    subjects: []
  });
  const [originalUsername, setOriginalUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const BASE_URL = 'http://127.0.0.1:8000';

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/check-username/?username=${username}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      return response.data.available;
    } catch (err) {
      console.error('Error checking username availability:', err);
      return false;
    }
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/students/${studentId}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setFormData(response.data);
        setOriginalUsername(response.data.user.username);
      } catch (err) {
        setError('Failed to fetch student data');
        console.error('Error fetching student:', err);
      }
    };

    if (accessToken) {
      fetchStudent();
    }
  }, [studentId, accessToken]);

  const handleUserChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({
      ...formData,
      user: {
        ...formData.user,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.user.username?.trim()) return 'Username is required';
    if (!formData.user.email?.trim()) return 'Email is required';
    if (!formData.user.first_name?.trim()) return 'First name is required';
    if (!formData.user.last_name?.trim()) return 'Last name is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const updatePayload = {
        user: {
          email: formData.user.email,
          first_name: formData.user.first_name,
          last_name: formData.user.last_name,
          contact_number: formData.user.contact_number
        },
        date_of_birth: formData.date_of_birth,
        gender: formData.gender,
        blood_group: formData.blood_group,
        address: formData.address
      };

      if (formData.user.username !== originalUsername) {
        updatePayload.user.username = formData.user.username;
      }

      const response = await axios.patch(
        `${BASE_URL}/api/students/${studentId}/update_student/`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSnackbarMessage('Student updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setOriginalUsername(formData.user.username);
    } catch (err) {
      console.error('Error updating student:', err);

      setSnackbarMessage(
        err.response?.data?.error || 'Failed to update student. Please try again later.'
      );
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>Edit Student Profile</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* User Details */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.user.username}
              onChange={handleUserChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.user.email}
              onChange={handleUserChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.user.first_name}
              onChange={handleUserChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.user.last_name}
              onChange={handleUserChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contact_number"
              value={formData.user.contact_number}
              onChange={handleUserChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>

          {/* Student Details */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" size="small" required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Blood Group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              size="small"
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Update Student
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for success or error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditStudent;
