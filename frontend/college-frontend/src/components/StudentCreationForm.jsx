import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';

const StudentCreationForm = () => {
  const [formData, setFormData] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      contact_number: ''
    },
    date_of_birth: '',
    gender: '',
    blood_group: '',
    address: '',
    profile_pic: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('user.')) {
      setFormData(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      profile_pic: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitFormData = new FormData();

    // Append user data
    Object.keys(formData.user).forEach(key => {
      submitFormData.append(`user.${key}`, formData.user[key]);
    });

    // Append other student details
    const nonUserFields = ['date_of_birth', 'gender', 'blood_group', 'address'];
    nonUserFields.forEach(field => {
      submitFormData.append(field, formData[field]);
    });

    // Append profile picture if exists
    if (formData.profile_pic) {
      submitFormData.append('profile_pic', formData.profile_pic);
    }

    try {
      const accessToken = localStorage.getItem('access_token');
      
      const response = await axios.post('/api/students/', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      alert('Student created successfully!');
      setFormData({
        user: {
          username: '',
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          contact_number: ''
        },
        date_of_birth: '',
        gender: '',
        blood_group: '',
        address: '',
        profile_pic: null
      });
    } catch (error) {
      console.error('Error creating student:', error.response ? error.response.data : error.message);
      alert('Failed to create student');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>Create Student</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* User Details */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="user.username"
              value={formData.user.username}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="user.email"
              type="email"
              value={formData.user.email}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="user.password"
              type="password"
              value={formData.user.password}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="user.first_name"
              value={formData.user.first_name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="user.last_name"
              value={formData.user.last_name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Number"
              name="user.contact_number"
              value={formData.user.contact_number}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              variant="outlined"
              size="small"
              multiline
              rows={3}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ fontSize: '0.875rem' }} // Smaller font for button
            >
              Create Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default StudentCreationForm;
