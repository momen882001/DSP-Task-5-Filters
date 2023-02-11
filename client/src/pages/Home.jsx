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
import style from './Home.css'

const Home = () => {
    return (
        <Container fluid>
            <Row className={style.Home}>
                <Col style={{display:"flex",flexDirection:"column",alignItems:"center", background:"rgb(139 157 195 / 22%)", borderRadius:"22px", margin: "15px 10px 0px 60px"}} lg={3} md={5} sm={6} xs={12}>
                    <div><p>Generate Filter</p></div>
                    <PolesZeros/>
                </Col>
                <Col style={{display:"flex", background:"rgb(139 157 195 / 22%)",flexDirection:"column", alignItems:"center", borderRadius:"22px", margin: "15px 10px 0px 10px"}} lg={4} md={6} sm={6} xs={12}>
                     <Plotting/>
                </Col>
                <Col style={{background:"rgb(139 157 195 / 22%)", borderRadius:"22px", margin: "15px 50px 0px 10px"}} lg={4} md={6} sm={6} xs={12}>
                     <div><p>Generate Signal</p></div>
                    <Signals/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home