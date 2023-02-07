import React, { useContext, useEffect } from 'react'
import './Signals.css'
import Plot from "react-plotly.js";
import { FileContext } from '../contexts/fileContext'
import axios from '../Global/axios'


const Signals = () => {

  const {
    signalPositionY,
    setSignalpositionY,
    Xaxis,
    setXaxis,
    countXaxis,
    setCountXaxis,
    signalYupdated,
    setSignalYupdated
  } = useContext(FileContext);

  useEffect(() => {
    axios.post('/filtering_signal', {
      signalPositionY
    }).then((response) => {
      console.log(response)
      setSignalYupdated(response.data.filtered_signal)
    }).catch((err) => {
      console.log(err)
    })
  }, [signalPositionY])



  const mouseMove = (event) => {
    setSignalpositionY([...signalPositionY, event.clientY])
    setXaxis([...Xaxis, countXaxis])
    setCountXaxis(countXaxis + 1)
    if (signalPositionY.length > 50) {
      setSignalpositionY(signalPositionY.slice(1, signalPositionY.length))
      setXaxis(Xaxis.slice(1, Xaxis.length))
    }
    console.log(signalPositionY);
    console.log(Xaxis);
  }

  const mouseLeave = () => {
    console.log("mouseLeave");
  }

  var input = {
    x: Xaxis,
    y: signalPositionY,
    type: "scatter",
    line: {
      color: "#333",
      width: 2,
    },
  };

  var output = {
    x: Xaxis,
    y: signalYupdated,
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
    <div className='signals-contain'>
      <div className='moving-area' onMouseMove={mouseMove} onMouseLeave={mouseLeave}></div>
      {/* input signal */}
      <Plot data={[input]} layout={layout} config={config} />
      {/* output signal */}
      <Plot data={[output]} layout={layout} config={config} />
    </div>
  )
}

export default Signals