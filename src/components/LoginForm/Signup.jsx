import React, {useEffect ,useState } from 'react';
import { SignUp } from '../Auth/index';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";


const Signup = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
  
    let info = {
      username: username,
      email: email,
      password: password,
      role: role,
    };
    SignUp(info);
    event.target.reset();
    navigate("/signin");
  };

  const handleUser = (event) => {
  
    if (role === 'user') {
      console.log('welcom user');
    }
  };

  useEffect(() => {
    handleUser(role);
  }, [role]);

  return (
    <Container>
        <Row className="vh-90 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                <h1 className='font-bold text-3xl text-gray-900'>SIGN UP</h1>
              <p>Enter your information to register</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control   
                        placeholder='John'
                        required
                        name='username' />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control   
                        placeholder='johnsmith@example.com'
                        required
                        name='email' />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                      placeholder='************'
                      required
                      name='password' />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                        REGISTER NOW
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account?{' '}
                <Link
                  to='/signin'
                  className='text-indigo-500  hover:indigo-600  py-3 font-semibold'
                >
                  Sign in.
                </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default Signup;