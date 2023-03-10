import React from 'react'
import CanvasJSReact from '../Canvas/canvasjs.react';

const Test = () => {

    
  let CanvasJS = CanvasJSReact.CanvasJS;
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
  
  const options =  {
      animationEnabled: true,
      theme: "light2",
      title:{
          text: "Simple Line Chart"
      },
      data: [{        
          type: "line",
            indexLabelFontSize: 16,
          dataPoints: [
              { y: 450 },
              { y: 414},
              { y: 520},
              { y: 460 },
              { y: 450 },
              { y: 500 },
              { y: 480 },
              { y: 480 },
              { y: 410 },
              { y: 500 },
              { y: 480 },
              { y: 510 }
          ]
      }]
  }

  return (
    <CanvasJSChart options={options}/>
  )
}

export default Test