import React from 'react'
import './Signals.css'
import Plot from "react-plotly.js";



const Signals = () => {
  var trace = {
    x: [1,2,3],
    y: [2,6,3],
    type: "scatter",
    line: {
      color: "#333" ,
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
      // l: 0,
      r: 0,
      // b: 0,
      t: 0
  }
  };

  return (
    <Plot data={[trace]} layout={layout} config={config} />
  )
}

export default Signals