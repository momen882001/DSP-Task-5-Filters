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
                <Col style={{display:"flex" , flexDirection:"column",justifyContent:"center" , alignItems:"center",height:"100vh"}} lg={4} md={6} sm={6} xs={12}>
                    <div className='col1'>
                    <p>Generate Filter</p>
                    <PolesZeros/>
                    </div>
                    
                </Col>
                <Col lg={4} md={6} sm={6} xs={12} style={{display:"flex" , flexDirection:"column",justifyContent:"center" , alignItems:"center",height:"100vh"}}>
                     <div className="col2">
                     <Plotting/>
                     </div>
                     
                </Col>
                <Col  lg={4} md={6} sm={6} xs={12} style={{display:"flex" , flexDirection:"column",justifyContent:"center" , alignItems:"center",height:"100vh"}}>
                     <div className='col3'>
                     <p>Generate Signal</p>
                     <Signals/>
                     </div>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Home