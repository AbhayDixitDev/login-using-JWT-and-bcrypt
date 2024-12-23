import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:9000/logout', { withCredentials: true });
            console.log("Logout response:", response.data);
            navigate("/home");
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">My App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to={"home"}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"register"}>Register</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;