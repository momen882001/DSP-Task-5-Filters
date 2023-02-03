import React , {useContext} from 'react'
import './Signals.css'
import Plot from "react-plotly.js";
import { FileContext } from '../contexts/fileContext'


const Signals = () => {

  const {
    signalPositionY,
    setSignalpositionY,
    Xaxis,
    setXaxis,
    countXaxis,
    setCountXaxis
} = useContext(FileContext);


  const mouseMove = (event) => {
    setSignalpositionY([...signalPositionY,event.clientY])
    setXaxis([...Xaxis,countXaxis])
    setCountXaxis(countXaxis+0.1)
    if (signalPositionY.length > 50) {
      setSignalpositionY(signalPositionY.slice(1,signalPositionY.length))
      setXaxis(Xaxis.slice(1,Xaxis.length))
    }
    console.log(signalPositionY);
    console.log(Xaxis);
}

const mouseLeave = () => {
    console.log("mouseLeave");
}

  var trace = {
    x:  Xaxis,
    y: signalPositionY,
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
      l: 20,
      r: 0,
      // b: 0,
      t: 0
  }
  };

  return (
    <div className='signals-contain'>
    <div className='moving-area' onMouseMove={mouseMove} onMouseLeave={mouseLeave}></div>
    {/* input signal */}
    <Plot data={[trace]} layout={layout} config={config} />
    {/* output signal */}
    {/* <Plot data={[trace]} layout={layout} config={config} /> */}
    </div>
  )
}

export default Signals