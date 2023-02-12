import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useContext, useEffect, useState } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../Global/axios'
import ImportExport from '../ExportImport/ImportExport'

const PolesZeros = () => {

    const [isDraggable, setIsDraggable] = useState(false);

    const selectPoint = (e, index) => {
        e.stopPropagation();
        setIsDraggable(!isDraggable);
        console.log(e.currentTarget.style.left)
        const myPoint = pointsList[index];
        myPoint.x = (e.clientX - 322) / 125
        myPoint.y = (465 - e.clientY) / 125;
    };

    // onMouseMove
    const dragPoint = (e, index) => {
        e.stopPropagation();
        console.log(e.clientY)
        console.log(pointsList)
        // e.currentTarget.style.left = e.clientX - 100 + "px"
        if (isDraggable) {
            console.log("fgnaejg")
            //   e.currentTarget.style.cursor = "grabbing";
            //   if (
            //     e.clientX < startBorderX - marginX &&
            //     e.clientX > endBorderX + marginX
            //   ) {
            e.currentTarget.style.left = (e.clientX - 176) + "px";
            //   }
            //   if (
            //     e.clientY < startBorderY - marginX &&
            //     e.clientY > endBorderY + marginX
            //   ) {
            e.currentTarget.style.top = (e.clientY - 316) + "px";
            //   }
        }
        // else {
        //   e.currentTarget.style.cursor = "grab";
        // }
    };


    // /////////////////////////////////////////////////////////////////


    // const [dragX,setDragX] = useState(0)
    // const [dragY,setDragY] = useState(0) 
    // const [dragList,setDragList] = useState([]) 

    // const mouseDown = (e,index) => {
    //     setDragX((e.clientX - 322))
    //     setDragY((465 - e.clientY))
    //     setDragList([...dragList,{
    //         dragX : dragX,
    //         dragY : dragY
    //     }])
    //     if(dragList.length === 2) {
    //         dragList.shift()
    //     }
    //    let newPoint = pointsList[index]
    //    newPoint.x = dragX
    //    newPoint.y = dragY

    //    console.log("newPoint")
    //    console.log(newPoint)
    //    console.log("dragX")
    //    console.log(dragX)
    //    console.log("dragY")
    //    console.log(dragY)
    // }


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
            // console.log(point.mode)
            point.mode === 'false' ?
                zeros.push({
                    x: `${point.x}`,
                    y: `${point.y}`
                }) :
                poles.push({
                    x: `${point.x}`,
                    y: `${point.y}`
                })
        })
        axios.post('/get_zeros_poles', {
            zeros, poles
        }).then((response) => {
            // console.log(response)
            setFrequency(response.data.freq)
            setMagnitude(response.data.magnitude)
            setPhase(response.data.angles)
        }).catch((err) => {
            // console.log(err)
        })
        // console.log(zeros)
        // console.log(poles)
    }, [pointsList, isDraggable])



    const mouseMove = (event) => {
        setPositionX((event.clientX - 322) / 125);
        setPositionY((465 - event.clientY) / 125);
        // console.log(event.clientX)
        // console.log(event.clientY)

    }

    const mouseLeave = () => {
        // console.log("mouseLeave");
    }

    const draw = () => {
        setPointList([...pointsList, {
            y: positionY,
            x: positionX,
            mode: `${mode}`,
        }])
    }

    const rightClick = (index, e) => {
        e.stopPropagation();
        e.preventDefault();
        let newPointsList = [...pointsList];
        newPointsList.splice(index, 1);
        setPointList(newPointsList);
    }
    // console.log("hello")
    // console.log(pointsList)
    // console.log(mode)

    return (
        <>
            <BootstrapSwitchButton
                className="custom-btn"
                checked={mode}
                onlabel='Poles'
                onstyle='danger'
                offlabel='Zeros'
                offstyle='primary'
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
                        point.mode === 'false' ? <div onClick={(e) => selectPoint(e, index)} onMouseMove={(e) => dragPoint(e, index)} onContextMenu={(e) => rightClick(index, e)} key={index} className='zero' style={{ top: ((point.y * (125 * -1)) + 146), left: ((point.x * 125) + 147) }} ></div>
                            :
                            <div onClick={(e) => selectPoint(e, index)} onMouseMove={(e) => dragPoint(e, index)} onContextMenu={(e) => rightClick(index, e)} key={index} className='pole' style={{ top: ((point.y * (125 * -1)) + 139), left: ((point.x * 125) + 147) }} >X</div>
                    )


                })}
            </div>
            <ImportExport />
        </>
    )
}

export default PolesZeros