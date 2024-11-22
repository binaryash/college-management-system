import React, { useState } from 'react';
import { login } from '../services/api'; // Use the renamed function
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Paper,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Create a theme for Material UI
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#1a86f2', // Bleu de France
    },
    background: {
      default: '#f3f6fa', // Anti-flash white
      paper: '#ffffff', // White
    },
  },
});

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access } = await login(username, password);
      
      // Store token in localStorage
      localStorage.setItem('access_token', access);
      
      // Call parent component's login handler
      onLogin(access);
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginBottom: 2, fontWeight: 500 }}
          >
            College Management System Login
          </Typography>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginBottom: 2 }}
            >
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: '10px', marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
