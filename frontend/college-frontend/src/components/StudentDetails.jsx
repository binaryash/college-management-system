import React, { useState, useEffect } from 'react';
import { getStudentDetails } from '../services/api';
import { Box, CircularProgress, Container, Paper, Typography, Divider, Grid, Tabs, Tab, ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Define a monochrome theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
    },
  },
  palette: {
    primary: {
      main: '#000000', // Black
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5', // Light grey paper
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#757575', // Dark grey text
    },
  },
});

const StudentDetails = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0); // Track selected tab

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const details = await getStudentDetails(token);
        setStudentData(details);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) return <div><CircularProgress /> Loading Student Details...</div>;
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
            <Tab label="Enrolled Subjects" />
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
                  <Typography variant="body1">{`${studentData.user.first_name} ${studentData.user.last_name}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Email</Typography>
                  <Typography variant="body1">{studentData.user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Enrollment Date</Typography>
                  <Typography variant="body1">{new Date(studentData.enrollment_date).toLocaleDateString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Date of Birth</Typography>
                  <Typography variant="body1">{new Date(studentData.date_of_birth).toLocaleDateString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Gender</Typography>
                  <Typography variant="body1">{studentData.gender}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Address</Typography>
                  <Typography variant="body1">{studentData.address}</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Enrolled Subjects
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {studentData.subjects && studentData.subjects.length > 0 ? (
                <Grid container spacing={2}>
                  {studentData.subjects.map((subject) => (
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
                <Typography variant="body1" color="textSecondary">No subjects enrolled</Typography>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default StudentDetails;
