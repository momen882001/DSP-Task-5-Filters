import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useContext, useEffect } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../Global/axios'

const PolesZeros = () => {

    const {
        mode,
        setMode,
        positionX,
        setPositionX,
        positionY,
        setPositionY,
        pointsList,
        setPointList,
        frequency,
        setFrequency,
        phase,
        setPhase,
        magnitude,
        setMagnitude
    } = useContext(FileContext);

    useEffect(() => {
        let zeros = []
        let poles = []
        pointsList.map((point) => {
            point.mode === false ?
                zeros.push({
                    x: point.x,
                    y: point.y
                }) :
                poles.push({
                    x: point.x,
                    y: point.y
                })
        })
        axios.post('/get_zeros_poles', {
            zeros, poles
        }).then((response) => {
            console.log(response)
            setFrequency(response.data.freq)
            setMagnitude(response.data.magnitude)
            setPhase(response.data.angles)
        }).catch((err) => {
            console.log(err)
        })
        console.log(zeros)
        console.log(poles)
    }, [pointsList])



    const mouseMove = (event) => {
        setPositionX((event.clientX - 228) / 125);
        setPositionY((203 - event.clientY) / 125);
        // console.log(positionX);
        // console.log(positionY);
    }

    const mouseLeave = () => {
        console.log("mouseLeave");
    }

    const draw = () => {
        setPointList([...pointsList, {
            y: positionY,
            x: positionX,
            mode: mode,
        }])
    }

    const rightClick = (index, e) => {
        e.stopPropagation();
        e.preventDefault();
        let newPointsList = [...pointsList];
        newPointsList.splice(index, 1);
        setPointList(newPointsList);
    }
    // console.log(pointsList)

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
                        point.mode === false ? <div onContextMenu={(e) => rightClick(index, e)} key={index} className='zero' style={{ top: ((point.y * (125 * -1)) + 146), left: ((point.x * 125) + 147) }} ></div>
                            :
                            <div onContextMenu={(e) => rightClick(index, e)} key={index} className='pole' style={{ top: ((point.y * (125 * -1)) + 139), left: ((point.x * 125) + 147) }} >X</div>
                    )
                })}
            </div>
          <ImportExport />
        </>
    )
}

export default PolesZeros