import React from 'react';
import { Container, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    function getUsername() {
        const token = localStorage.getItem('token');
        const decoded = jwt.verify(token, 'key');
        return decoded.Username;
    }

    return ( 
        <Container>
            <h1>Hello {getUsername()}</h1>
            <Button variant="danger" onClick={handleLogout}>LOG OUT</Button>
            
        </Container>
     );
}
 
export default Dashboard;