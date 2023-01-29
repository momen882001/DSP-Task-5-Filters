import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useState } from 'react'

const PolesZeros = () => {
    const [mode, setMode] = useState(false)
    const [positionX, setPositionX] = useState(false)
    const [positionY, setPositionY] = useState(false)
    const [pointsList,setPointList] = useState([])

    const mouseMove = (event) => {
        setPositionX(event.clientX - 32);
        setPositionY(event.clientY - 54);
        console.log(positionX);
        console.log(positionY);
    }

    const mouseLeave = () => {
        console.log("mouseLeave");
    }

//     const draw = (index) => {
//         console.log("done");
//         if (mode === false) {
//         pointsList.push(
//             <div key={index} className="zero" style={{ top: positionY, left: positionX }}></div>
//         )
//     } else {
//         pointsList.push(
//             <div key={index} className="pole" style={{ top: positionY, left: positionX }}>x</div>
//         )
//     }
// }

    const draw = () => {
        console.log("done");
    pointsList.push(
        {
            y  : positionY,
            x  : positionX,
            mode : mode,
        }
    )    
    console.log(pointsList);   
}

    return (
        <>
            <BootstrapSwitchButton
                className="custom-btn"
                checked={mode}
                onlabel='Poles'
                onstyle='primary'
                offlabel='Zeros'
                offstyle='danger'
                style='w-50'
                onChange={(e) => {
                    setMode(!mode)
                }}
            />
            <div className='circle-container'  onClick={draw} onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
                <div className='separator1'></div>
                <div className='separator2'></div>
                <div className='circle'></div>
                {pointsList.map((point,index) => {
                    return (
                        point.mode === false ? <div key={index} className='zero' style={{top:point.y , left:point.x}} ></div>
                        :
                        <div key={index} className='pole' style={{top:point.y - 2 , left:point.x}} >x</div>
                    )
                })}
            </div>
        </>
    )
}

export default PolesZeros