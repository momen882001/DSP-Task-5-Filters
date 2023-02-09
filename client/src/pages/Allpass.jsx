import React from 'react'
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import AllpassPlotting from '../components/AllpassPlotting/AllpassPlotting';
import Form from '../components/Form/Form';
import Slider from '../components/Slider/slider';


const Allpass = () => {
  return (
    <Container fluid>
      <Row>
        <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }} lg={4} md={6} sm={6} xs={12}>
          <Slider />
        </Col>
        <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }} lg={4} md={6} sm={6} xs={12}>
          <Form />
        </Col>
        <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }} lg={4} md={6} sm={6} xs={12}>
          <AllpassPlotting />
        </Col>
      </Row>
    </Container>
  )
}

export default Allpass