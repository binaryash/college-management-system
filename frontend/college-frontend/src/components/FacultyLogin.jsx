// /components/FacultyLogin.jsx
import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const FacultyLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            localStorage.setItem('accessToken', data.access);
            navigate(`/faculty/${data.id}`);  // Navigate to faculty details page
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Faculty Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default FacultyLogin;
