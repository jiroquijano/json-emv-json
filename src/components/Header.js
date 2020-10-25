import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header__nav-banner">
            <Container>
                <Row>
                    <Col>
                        <h2>
                            JSON-EMV-JSON
                        </h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;