import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">React</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default Navigation;
