import React ,  { useContext } from 'react'
import Plot from "react-plotly.js";
import { FileContext } from '../contexts/fileContext'

const AllpassPlotting = () => {

    const {
        frequency,
        phase,
        yAxisAllpass,
        aValueResponse, 
        XAxisAllpass,
      } = useContext(FileContext);

      console.log(yAxisAllpass)

      var angle = {
        x: frequency,
        y: phase,
        type: "scatter",
        line: {
          color: "#333",
          width: 2,
        },
      };

      var angleAllpass = {
        x: XAxisAllpass,
        y: yAxisAllpass,
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
    <>
    <p>Original phase</p>
    <Plot data={[angle]} layout={layout} config={config} />
    <p>Allpass for A = {aValueResponse}</p>
    <Plot data={[angleAllpass]} layout={layout} config={config} />
    </>
  )
}

export default AllpassPlotting