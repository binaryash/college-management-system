// /src/components/HomePage.jsx
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the College Management System</h1>
            <p>Choose a login option:</p>
            <a href="/faculty-login">Faculty Login</a>
            <br />
            <a href="/student-login">Student Login</a>
        </div>
    );
};

export default HomePage;
