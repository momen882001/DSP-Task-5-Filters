import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../Global/axios'
import './Form.css'
import { IoIosAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
const Form = () => {

    const {
        aValue,
        setAvalue,
        aValueList,
        setAvalueList,
        yAxisAllpass,
        setYaxisAllpass,
        aValueResponse, 
        setAvalueResponse,
        setXaxisAllpass,
        setPhase
    } = useContext(FileContext);

    useEffect(() => {
        axios.post('/all_pass_filter_response', {
            aValueList
        }).then((response) => {
            console.log(response)
            setPhase(response.data.filter_phase_response)
        }).catch((err) => {
            console.log(err)
        })
    }, [aValueList])

    const Blur = () => {
        console.log("done")
        axios.post('/all_pass_filter',{
            aValue
        }).then((response) => {
            console.log(response)
            setYaxisAllpass(response.data.all_pass_phase_response)
            setAvalueResponse(response.data.aValue)
            setXaxisAllpass(response.data.frequency)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(aValueList)

    const handleAdding = () => {
        setAvalueList([...aValueList, {
            A: aValue
        }])
        setAvalue('')
        // axios.post('/all_pass_filter_response', {
        //     aValueList
        // }).then((response) => {
        //     console.log(response)
        //     setPhase(response.data.filter_phase_response)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    const handleDeleting = (index,e) => {
        e.preventDefault()
        let newAvalueList = [...aValueList]
        newAvalueList.splice(index,1)
        setAvalueList(newAvalueList)
        // axios.post('/all_pass_filter_response', {
        //     aValueList
        // }).then((response) => {
        //     console.log(response)
        //     setPhase(response.data.filter_phase_response)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }



    return (
        <div>
            <div>
                <p className='header'>A Value</p>
                <input type="text" value={aValue} onChange={(e) => setAvalue(e.target.value)} onBlur={Blur} className='type'/>
            
                <button onClick={handleAdding} className='add'>
                 <IoIosAddCircleOutline/>
                </button>
                {aValueList.map((value, index) => {
                    return (
                        <div  key={index} className='table'>
                            <p className='value'>{value.A}</p>
                            <button onClick={(e) => handleDeleting(index,e)} className='add'>
                           <IoMdRemoveCircleOutline/>
                            </button>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Form