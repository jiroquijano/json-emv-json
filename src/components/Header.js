import React from 'react';
import {NavLink} from 'react-router-dom';
import {Container, Col, Row} from 'react-bootstrap';

const Header = () => {
    return (
        <div className="header__nav-banner">
            <Container>
                <Row>
                    <Col md="9" lg="9">
                    </Col>
                    <Col md="3" lg="3">
                        <NavLink className="header__navlink" 
                            activeClassName="header__navlink--selected"
                            to="/json-emv">
                            JSON-EMV
                        </NavLink>
                        <NavLink className="header__navlink"
                            activeClassName="header__navlink--selected"
                            to="/emv-json">
                            EMV-JSON
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;