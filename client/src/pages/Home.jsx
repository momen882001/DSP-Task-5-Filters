import React from 'react'
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Plotting from '../components/Plotting/Plotting';
import Signals from '../components/Signals/Signals';
import PolesZeros from '../components/Zeros&poles/PolesZeros';

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg={4} md={6} sm={6} xs={12}>
                    <PolesZeros/>
                </Col>
                <Col lg={4} md={6} sm={6} xs={12}>
                    <Plotting/>
                </Col>
                <Col lg={4} md={6} sm={6} xs={12}>
                    <Signals/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home