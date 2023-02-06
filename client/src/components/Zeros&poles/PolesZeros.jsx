import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useContext } from 'react'
import { FileContext } from '../contexts/fileContext'

const PolesZeros = () => {

    const {
        mode,
        setMode,
        positionX,
        setPositionX,
        positionY,
        setPositionY,
        pointsList,
        setPointList
    } = useContext(FileContext);

    const mouseMove = (event) => {
        setPositionX( ( event.clientX - 228) / 125 );
        setPositionY( ( 203 - event.clientY ) / 125 );
        console.log(positionX);
        console.log(positionY);
    }

    const mouseLeave = () => {
        console.log("mouseLeave");
    }

    const draw = () => {
        pointsList.push(
            {
                y: positionY,
                x: positionX,
                mode: mode,
            }
        )
        console.log(pointsList);
    }

    const rightClick = (index, e) => {
        e.stopPropagation();
        e.preventDefault();
        let newPointsList = [...pointsList];
        newPointsList.splice(index, 1);
        setPointList(newPointsList);
    }
    console.log(pointsList)

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
            <div className='circle-container' onClick={draw} onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
                <div className='y-axis'></div>
                <div className='x-axis'></div>
                <div className='circle'></div>
                {pointsList.map((point, index) => {
                    return (
                        point.mode === false ? <div onContextMenu={(e) => rightClick(index, e)} key={index} className='zero' style={{ top: ((point.y * (125 * -1)) + 146 ), left: ((point.x * 125) + 147) }} ></div>
                            :
                            <div onContextMenu={(e) => rightClick(index, e)} key={index} className='pole' style={{ top: ((point.y * (125 * -1)) + 139 ), left: ((point.x * 125) + 147 ) }} >X</div>
                    )
                })}
            </div>
        </>
    )
}

export default PolesZeros