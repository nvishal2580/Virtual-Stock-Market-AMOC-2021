import { Button } from 'react-bootstrap';
import React from 'react';

const Home = () => {
    return ( 
        <div style={{padding : '100px'}}>
            <h1>Home page</h1>
            <Button className="m-3" href="/login">Login </Button>
            <Button href="/register">Register</Button>
        </div>
     );
}

export default Home;