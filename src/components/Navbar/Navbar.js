import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import logo from './'
export default function navBar() {
  return (
    <>
     {/* <div className="covid-about">
      <h2>Covid-19 Statistics</h2>
      <h3>A website to provide you with all the updates on covid-19 statistics around the world</h3>
      </div> */}
      {/* <img src={logo} alt="logo" width="100%"/> */}
      <Navbar bg="info"  text="white"  className="text-center"
       style={{margin:"10px" ,fontSize:"20px"}} >
        <Container>
          <Nav className="me-auto" fw-bolder text="white" style={{margin:"10px"}}>
           
          {/* <Nav.Link href="/signin">Signin</Nav.Link> */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/allCountry">All Countries</Nav.Link>
            <Nav.Link href="/myRecord">My Records</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

