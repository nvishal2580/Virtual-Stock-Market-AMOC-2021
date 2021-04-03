import React ,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Container , Form , Button} from 'react-bootstrap';
import axios from 'axios';
import { Login_Logo } from './../Data/Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const URI = 'http://localhost:5002/login';
const Login = ({history}) => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Errors, setErrors] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { Email, Password };
        console.log(user);

        try {
            const { data: token } = await axios.post(URI, user);
            toast.success('Successfully Loged in');
            localStorage.setItem('token', token);
             history.push('/dashboard');


        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errormsg = error.response.data;
                setErrors(errormsg);
                toast.error(error.response.data);
            }

        }

    }

    // console.log(Email,Password);

    return ( 
        <Container fluid className="login-primary-container">
            <ToastContainer />
            <Container className="login-secondary-container text-center" style={{width : '500px'}} >
                <Form>
                <h3 className="login-title">Login <img src={Login_Logo} /></h3>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                 <Form.Control value={Email} type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                 </Form.Group>
                 
                <Form.Group controlId="formBasicPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control value={Password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                 </Form.Group>
                 
                <Button onClick={handleSubmit} variant="outline-primary" block  style={{marginTop : '30px'}}>Login</Button>
                </Form>
                <hr></hr>
                <p>Not registered ! <a href="/register">Create account </a></p>
                
            </Container>
        </Container>
     );
}
 
export default withRouter(Login);