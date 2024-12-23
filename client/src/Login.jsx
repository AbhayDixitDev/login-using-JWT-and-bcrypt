import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post('https://your-api-endpoint.com/login', formData);
            console.log('Login successful:', response.data);
            // You can redirect or show a success message here
        } catch (error) {
            console.error('There was an error logging in!', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;