import React, { useState, useEffect } from 'react';
import { getFacultyDetails } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Container,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a monochrome theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontSize: '1.5rem',  // Slightly smaller header
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.1rem',  // Smaller subheadings
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem', // Smaller body text
    },
  },
  palette: {
    primary: {
      main: '#000000', // Black
    },
    background: {
      default: '#ffffff', // White background
      paper: '#f5f5f5', // Light grey paper
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#757575', // Dark grey text
    },
  },
});

const FacultyDetails = () => {
  const [facultyData, setFacultyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);  // Track selected tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const details = await getFacultyDetails(token);
        setFacultyData(details);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch faculty details');
        setLoading(false);
      }
    };

    fetchFacultyDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) return <div><CircularProgress /> Loading Faculty Details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Main Content */}
      <Container maxWidth="md" sx={{ marginTop: 2 }}>
        {/* Tab Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label="Personal Info" />
            <Tab label="Professional Info" />
            <Tab label="Subjects Taught" />
            <Tab label="Students Enrolled" />
          </Tabs>
        </Box>

        {/* Content Based on Selected Tab */}
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
          {selectedTab === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Personal Information
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Full Name</Typography>
                  <Typography variant="body1">{`${facultyData.user.first_name} ${facultyData.user.last_name}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Email</Typography>
                  <Typography variant="body1">{facultyData.user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Contact Number</Typography>
                  <Typography variant="body1">{facultyData.user.contact_number}</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Professional Information
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Department</Typography>
                  <Typography variant="body1">{facultyData.department}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Qualification</Typography>
                  <Typography variant="body1">{facultyData.qualification}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Date Joined</Typography>
                  <Typography variant="body1">{new Date(facultyData.date_joined).toLocaleDateString()}</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Subjects Taught
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {facultyData.subjects_taught && facultyData.subjects_taught.length > 0 ? (
                <Grid container spacing={2}>
                  {facultyData.subjects_taught.map((subject) => (
                    <Grid item xs={12} md={6} key={subject.id}>
                      <Box sx={{ backgroundColor: theme.palette.background.paper, padding: 2, borderRadius: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>{subject.name}</Typography>
                        <Typography variant="body1"><strong>Code:</strong> {subject.code}</Typography>
                        <Typography variant="body2">{subject.description || 'No description available'}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1" color="textSecondary">No subjects assigned</Typography>
              )}
            </Box>
          )}

          {selectedTab === 3 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Students Enrolled in My Subjects
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {facultyData.students && facultyData.students.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', fontWeight: 500, marginBottom: 1 }}>
                    <Box sx={{ flex: 1 }}>Student Name</Box>
                    <Box sx={{ flex: 1 }}>Email</Box>
                    <Box sx={{ flex: 1 }}>Enrolled On</Box>
                  </Box>
                  {facultyData.students.map((student) => (
                    <Box key={student.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                      <Box sx={{ flex: 1 }}>{`${student.user.first_name} ${student.user.last_name}`}</Box>
                      <Box sx={{ flex: 1 }}>{student.user.email}</Box>
                      <Box sx={{ flex: 1 }}>{new Date(student.enrollment_date).toLocaleDateString()}</Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" color="textSecondary">No students enrolled in your subjects</Typography>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default FacultyDetails;
