import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useState } from 'react'

const PolesZeros = () => {
    const [mode, setMode] = useState(false)
    const [positionX, setPositionX] = useState()
    const [positionY, setPositionY] = useState()
    const [pointsList,setPointList] = useState([])

    const mouseMove = (event) => {
        setPositionX(event.clientX - 80 );
        setPositionY(event.clientY - 55);
        // console.log(positionX);
        // console.log(positionY);
    }

    const mouseLeave = () => {
        console.log("mouseLeave");
    }

    const draw = () => {
    pointsList.push(
        {
            y  : positionY,
            x  : positionX,
            mode : mode,
        }
    )    
    console.log(pointsList);
}

const rightClick = (index,e) => {
    e.stopPropagation();
    e.preventDefault();
    let newPointsList = [...pointsList];
    newPointsList.splice(index,1);
    setPointList(newPointsList);
    console.log(pointsList)
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
                        point.mode === false ? <div  onContextMenu={(e) => rightClick(index,e)} key={index} className='zero' style={{top:point.y , left:point.x}} ></div>
                        :
                        <div  onContextMenu={(e) => rightClick(index,e)} key={index} className='pole' style={{top:point.y - 9 , left:point.x - 2}} >X</div>
                    )
                })}
            </div>
        </>
    )
}

export default PolesZeros