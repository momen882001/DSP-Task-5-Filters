import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useContext, useEffect } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../Global/axios'
import ImportExport from '../ExportImport/ImportExport'

const PolesZeros = () => {

//   let offsetX,offsetY
//   const move=e=>
//   {
//     const el=e.target
//     el.style.left = `${e.pageX-offsetX}px`
//     el.style.top = `${e.pageY-offsetY}px`
//     console.log("Move");
//     // console.log("Page Offset X");
//     // console.log(e.pageX-offsetX);
//     // console.log(e.pageX);
//     // console.log(offsetX);
//     // console.log("Page Offset Y");
//     // console.log(e.pageY-offsetY);
//     // console.log(e.pageY);
//     // console.log(offsetY);
//   }
//   const add=(index,e)=>
//   {
//     const el=e.target
//     offsetX=positionX-el.getBoundingClientRect().left
//     offsetY=positionY-el.getBoundingClientRect().top
//     el.addEventListener('mousemove',move)
//     console.log("ADD X");

//     // console.log(e.target);
//     // console.log(positionX);
//     // console.log("offset X");
//     // console.log(offsetX);
//     // console.log("ADD Y");
//     // console.log(positionY);
//     // console.log("offset Y");
//     // console.log(offsetY);

//     // e.stopPropagation();
//     // e.preventDefault();
//     console.log(index);
//     // let newPointsList = [...pointsList];
//     // newPointsList.splice(index-1, 1);
//     // setPointList(newPointsList);

//   }
//   const remove=()=>{
//     // const el=target
//     console.log("Remove X");
//     // console.log(target);
//     console.log(positionX);
//     // el.removeEventListener('mousemove',move)
//   }
// //   const Wrapper=styled.div`
// //   width: 50px;
// //   height: 50px;
// //   border-radius: 29px;
// //   box-shadow: 0 0 6px;
// //   position: absolute;
// //   top: 40px;
// //   left: 227px;
// //   background-color: rgb(0,0,0,0.5);
// //   cursor:pointer;
// //   `



// onClick ********************************************************************************************************************
// const [isDraggable,setIsDraggable]  = React.useState(false);
// const selectPoint = (e) => {
//     e.stopPropagation();
//     setIsDraggable(!isDraggable);
//     const myPoint = pointsList[e.currentTarget.id];
//     if (
//       e.clientX < startBorderX - marginX &&
//       e.clientX > endBorderX + marginX
//     ) {
//       myPoint.x = e.clientX - marginX;
//     }
//     if (
//       e.clientY < startBorderY - marginX &&
//       e.clientY > endBorderY + marginX
//     ) {
//       myPoint.y = e.clientY - marginY;
//     }
//     // console.log(e.clientX)
//     // console.log(e.clientY)
//   };

//   // onMouseMove
//   const dragPoint = (e) => {
//     e.stopPropagation();
//     if (isDraggable) {
//       e.currentTarget.style.cursor = "grabbing";
//       if (
//         e.clientX < startBorderX - marginX &&
//         e.clientX > endBorderX + marginX
//       ) {
//         e.currentTarget.style.left = e.clientX - marginX + "px";
//       }
//       if (
//         e.clientY < startBorderY - marginX &&
//         e.clientY > endBorderY + marginX
//       ) {
//         e.currentTarget.style.top = e.clientY - marginY + "px";
//       }
//     } else {
//       e.currentTarget.style.cursor = "grab";
//     }
//   }


// /////////////////////////////////////////////////////////////////

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
    }, [pointsList])



    const mouseMove = (event) => {
        setPositionX((event.clientX - 322 ) / 125);
        setPositionY((465 - event.clientY) / 125 );
        // setPositionX((event.clientX - 323  +90) );
        // setPositionY((274 - event.clientY -3) );
        // console.log("XXXX");
        console.log(positionX);
        // console.log("YYYYY");
        console.log(positionY);
        // console.log("New");
        
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
                        point.mode === 'false' ? <div  onContextMenu={(e) => rightClick(index, e)} key={index} className='zero' style={{ top: ((point.y * (125 * -1)) + 146), left: ((point.x * 125) + 147) }} ></div>
                            :
                            <div onContextMenu={(e) => rightClick(index, e)} key={index} className='pole' style={{ top: ((point.y * (125 * -1)) + 139), left: ((point.x * 125) + 147) }} >X</div>
                    )
                    // onClick={selectPoint} onMouseMove={dragPoint}
                })}
            </div>
          <ImportExport />
        </>
    )
}

export default PolesZeros