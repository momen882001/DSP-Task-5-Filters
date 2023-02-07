import React, { useContext } from 'react'
import './Plotting.css'
import Plot from "react-plotly.js";
import { FileContext } from '../contexts/fileContext'


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
  };

  var angle = {
    x: frequency,
    y: phase,
    type: "scatter",
    line: {
      color: "#333",
      width: 2,
    },
  };

  var config = {
    displayModeBar: false,
    displaylogo: false
  }

  var layout = {
    width: 320,
    height: 240,
    margin: {
      l: 20,
      r: 0,
      // b: 0,
      t: 0
    }
  };

  return (
    <div >
      {/*  mag */}
      <Plot data={[mag]} layout={layout} config={config} />
      {/* phase */}
      <Plot data={[angle]} layout={layout} config={config} />
    </div>
  )
}

export default Signals