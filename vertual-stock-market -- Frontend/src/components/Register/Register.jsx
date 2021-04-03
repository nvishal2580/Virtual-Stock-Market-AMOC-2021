import React,{useState} from 'react';
import axios from 'axios';
import { Container,Form , Button } from 'react-bootstrap';
import {Register_Logo} from '../Data/Data';
import './Register.css';
import { withRouter } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

const URI = 'http://localhost:5002/register/'
const Register = ({history}) => {
    
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Errors, setErrors] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = { Username, Email, Password };
        try {
            const { data: token } = await axios.post(URI, user);
            localStorage.setItem('token', token);
            toast.success('Successfully Registered !');
            history.push('/dashboard');

        } catch (error) {
            toast.error(error.response.data);
        }

    }

    return ( 
        <Container fluid className="register-primary-container">
            <ToastContainer />
            <Container className="register-secondary-container text-center" style={{width : '500px'}} >
                <Form onSubmit={handleSubmit}>
                <h3 className="register-title">Register <img src={Register_Logo} /></h3>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                 <Form.Control type="text" value = {Email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                 </Form.Group>
                 
                 <Form.Group controlId="formBasicPassword">
                    <Form.Label>Username</Form.Label>
                 <Form.Control value={Username} type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
                 </Form.Group>

                <Form.Group controlId="formBasicPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control value={Password} type="password" placeholder="create password" onChange={(e) => setPassword(e.target.value)} required />
                 </Form.Group>
                 
                <Button type="submit"  variant="outline-secondary" block  style={{marginTop : '30px'}}>Register</Button>
                </Form>
                <hr></hr>
                <p>Already registered ! <a href="/login">Login here </a></p>
            </Container>
        </Container>
     );
}
 
export default withRouter(Register);