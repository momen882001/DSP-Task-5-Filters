import React, { useContext } from 'react'
import './Plotting.css'
import Plot from "react-plotly.js";
import { FileContext } from '../contexts/fileContext'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import FullScreenDialog from '../../pages/FullScreenDialog';


const Signals = () => {

  const {
    frequency,
    phase,
    magnitude,
  } = useContext(FileContext);



  var mag = {
    x: frequency,
    y: magnitude,
    type: "scatter",
    line: {
      color: "#333",
      width: 2,
    },
    yaxis:"y1"
    
  };

  var angle = {
    x: frequency,
    y: phase,
    type: "scatter",
    line: {
      color: "#333",
      width: 2,
    },
    yaxis:"y2"

  };

  var config = {
    displayModeBar: false,
    displaylogo: false
  }

  var layout = {
    width: 420,
    height: 240,
    margin: {
      l: 20,
      r: 0,
      // b: 0,
      t: 0
    },
    xaxis: {
      automargin: true,
      title: {
        text: "Frequency",
        standoff: 20
      }},
      yaxis1: {
        automargin: true,
        tickangle: 90,
        title: {
          text: "Magnitude",
          standoff: 20
        }},
        yaxis2: {
          automargin: true,
          tickangle: 90,
          title: {
            text: "Phase",
            standoff: 20
          }},
  };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >
      <p>Magnitude Response</p>

      {/*  mag */}
      <Plot data={[mag]} layout={layout} config={config} />
      {/* phase */}
      <p>Phase Response</p>
      <Plot data={[angle]} layout={layout} config={config} />
        <FullScreenDialog/>
    </div>
  )
}

export default Signals