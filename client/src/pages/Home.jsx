import React from 'react'
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import AllpassPlotting from '../components/AllpassPlotting/AllpassPlotting';
import Form from '../components/Form/Form';
import Plotting from '../components/Plotting/Plotting';
import Signals from '../components/Signals/Signals';
import Test from '../components/Signals/Test';
import Slider from '../components/Slider/Slider';
import PolesZeros from '../components/Zeros&poles/PolesZeros';
import FullScreenDialog from './FullScreenDialog';

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col style={{display:"flex",flexDirection:"column",alignItems:"center"}} lg={4} md={6} sm={6} xs={12}>
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