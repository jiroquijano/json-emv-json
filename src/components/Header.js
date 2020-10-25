import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header__nav-banner">
            <Container>
                <Row>
                    <Col sm={6} md={7} lg={9}>
                    </Col>
                    <Col sm={6} md={5} lg={3}>
                        JSON-EMV-JSON
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;