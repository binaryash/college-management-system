import React, { useState } from 'react';
import axios from 'axios';
import FacultyLogin from './components/FacultyLogin';
import Login from './components/Login';
import FacultyDetails from './components/FacultyDetails';
import StudentDetails from './components/StudentDetails';
import StudentCreationForm from './components/StudentCreationForm';
import StudentSubject from './components/StudentSubject';
import EditStudent from './components/EditStudent';
import { Button, CssBaseline, ThemeProvider, createTheme, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Create a custom MUI theme with only black and white colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for primary
    },
    secondary: {
      main: '#ffffff', // White for secondary
    },
    background: {
      default: '#ffffff', // White background
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#555555', // Slightly gray text for secondary text
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.1)', // Slight gray hover effect for buttons
    },
  },
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [currentView, setCurrentView] = useState('default');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [studentId, setStudentId] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(true); // Sidebar open state
  const [hovered, setHovered] = useState(false); // To manage hover effect

  const handleLogin = async (token) => {
    try {
      setAccessToken(token);
      localStorage.setItem('access_token', token);

      const facultyResponse = await axios.get(`${BASE_URL}/faculty/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (facultyResponse.data.length > 0) {
        localStorage.setItem('user_type', 'faculty');
        setUserType('faculty');
      } else {
        const studentResponse = await axios.get(`${BASE_URL}/students/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (studentResponse.data.length > 0) {
          localStorage.setItem('user_type', 'student');
          setUserType('student');
          setStudentId(studentResponse.data[0].id);
        } else {
          throw new Error('No user profile found');
        }
      }

      setIsLoggedIn(true);
      setCurrentView('default');
    } catch (error) {
      console.error('Login verification failed', error);
      localStorage.removeItem('access_token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentView('default');
    setAccessToken(null);
  };

  const handleStudentCreated = (newStudent) => {
    console.log('New student created:', newStudent);
    setCurrentView('default');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const sidebarContent = (
    <div>
      <List>
        <ListItem
          button
          onClick={() => setCurrentView('default')}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              transform: 'scale(1.05)', // Optional: Adds a slight zoom effect
              transition: 'transform 0.2s ease, background-color 0.3s ease', // Smooth transition
            },
            padding: '8px 16px', // Optional: To add padding around text
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>

        {userType === 'faculty' && (
          <>
            <ListItem
              button
              onClick={() => setCurrentView('create-student')}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'scale(1.05)', // Optional: Adds a slight zoom effect
                  transition: 'transform 0.2s ease, background-color 0.3s ease', // Smooth transition
                },
                padding: '8px 16px', // Optional: To add padding around text
              }}
            >
              <ListItemText primary="Create Student" />
            </ListItem>
            <ListItem
              button
              onClick={() => setCurrentView('add-student-subject')}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'scale(1.05)', // Optional: Adds a slight zoom effect
                  transition: 'transform 0.2s ease, background-color 0.3s ease', // Smooth transition
                },
                padding: '8px 16px', // Optional: To add padding around text
              }}
            >
              <ListItemText primary="Add Student to Subject" />
            </ListItem>
          </>
        )}

        {(userType === 'faculty' || userType === 'student') && (
          <>
            <ListItem
              button
              onClick={() => setCurrentView('student-subject')}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'scale(1.05)', // Optional: Adds a slight zoom effect
                  transition: 'transform 0.2s ease, background-color 0.3s ease', // Smooth transition
                },
                padding: '8px 16px', // Optional: To add padding around text
              }}
            >
              <ListItemText primary={userType === 'faculty' ? 'Subject Management' : 'My Subjects'} />
            </ListItem>

            {userType === 'student' && (
              <ListItem
                button
                onClick={() => setCurrentView('edit-profile')}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transform: 'scale(1.05)', // Optional: Adds a slight zoom effect
                    transition: 'transform 0.2s ease, background-color 0.3s ease', // Smooth transition
                  },
                  padding: '8px 16px', // Optional: To add padding around text
                }}
              >
                <ListItemText primary="Edit Profile" />
              </ListItem>
            )}
          </>
        )}
      </List>

      <Divider />

      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              transform: 'scale(1.05)', // Optional: Adds a slight zoom effect
              transition: 'transform 0.2s ease, background-color 0.3s ease', // Smooth transition
            },
            padding: '8px 16px', // Optional: To add padding around text
          }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex' }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          sx={{
            width: openSidebar ? 240 : 60,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: openSidebar ? 240 : 60,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              transition: 'width 0.3s ease', // smooth transition
            },
            '& .MuiListItemText-root': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* Main Content Area */}
        <div style={{ flexGrow: 1, padding: 16 }}>
          {currentView === 'default' && (
            userType === 'faculty' ? <FacultyDetails /> : <StudentDetails />
          )}

          {currentView === 'create-student' && userType === 'faculty' && (
            <StudentCreationForm 
              token={accessToken} 
              onStudentCreated={handleStudentCreated} 
            />
          )}

          {currentView === 'add-student-subject' && userType === 'faculty' && (
            <StudentSubject 
              token={accessToken}
              userType={userType}
              mode="add"
            />
          )}

          {currentView === 'student-subject' && (
            <StudentSubject 
              token={accessToken}
              userType={userType}
              mode="view"
            />
          )}

          {currentView === 'edit-profile' && userType === 'student' && studentId && (
            <EditStudent 
              studentId={studentId} 
              accessToken={accessToken} 
            />
          )}
        </div>
        </div>
    </ThemeProvider>
  );
};

export default App;

