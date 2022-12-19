import React, { useState } from 'react';
import { SignIn, authenticate, isAuthenticated } from '../Auth/index';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";


function Signin() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = data;
  const { user } = isAuthenticated()
  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    SignIn(data).then((data) => {
      setData({ ...data });
      authenticate(data);
      setShow(true)
    });
    event.target.reset();
  };

  return (
    <>
       <Container>
        <Row className="vh-90 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Sign In</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control  placeholder='Username'
                      required
                      value={username}
                      onChange={handleChange('username')} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        placeholder='************'
                      required
                      value={password}
                      onChange={handleChange('password')} />
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
                        Signin
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link
                        to='/signup'
                  className='text-indigo-500  hover:indigo-600  py-3 font-semibold'
                    >
                  Signup
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
      {
        show ? (
          !user ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-8 mx-5 ">
                  <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                    <p className='mx-5 py-5 text-xl italic font-black text-red-500' >The  email  or  password  you’ve  entered  is  incorrect.</p>
                    <button className='pb-2 text-xl italic font-black bg-yellow-500  hover:bg-yellow-800 tracking-wide text-textBlack hover:text-white' onClick={() => setShow(false)} >ok</button>
                  </div>
                </div>
              </div>
            </>
          ) :  
          navigate("/myRecord")
        ) : null
      }
    </>
  );
}

export default Signin;