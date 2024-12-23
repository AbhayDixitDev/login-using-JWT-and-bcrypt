import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        roll: '',
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
            const response = await axios.post('http://localhost:9000/user/register', formData);
            console.log('Registration successful:', response.data);
            // You can redirect or show a success message here
        } catch (error) {
            console.error('There was an error registering!', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <Container className="mt-5">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicRole">
                    <Form.Label>Roll no</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your roll"
                        name="roll"
                        value={formData.roll}
                        onChange={handleChange}
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
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default Register;