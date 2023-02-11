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
import './Home.css'

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col style={{ }} className="col1" lg={3} md={5} sm={6} xs={12}>
                    <div className='col1'>
                    <p>Generate Filter</p>
                    <PolesZeros/>
                    </div>
                    
                </Col>
                <Col className='col2'  lg={4} md={6} sm={6} xs={12}>
                     <Plotting/>
                </Col>
                <Col  className='col3' lg={4} md={6} sm={6} xs={12}>
                     <div>
                     <p>Generate Signal</p>
                     <Signals/>
                     </div>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Home