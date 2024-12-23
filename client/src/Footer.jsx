import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center py-3">
            <Container>
                <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;