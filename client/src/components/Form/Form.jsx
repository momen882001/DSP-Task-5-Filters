import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../Global/axios'

const Form = () => {

    const {
        aValue,
        setAvalue,
        aValueList,
        setAvalueList
    } = useContext(FileContext);

    const Blur = () => {
        console.log("done")
        axios.post('/all_pass_filter',{
            aValue
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleAdding = () => {
        setAvalueList([...aValueList, {
            A: aValue
        }])
        setAvalue('')
    }

    const handleDeleting = (index,e) => {
        e.preventDefault()
        let newAvalueList = [...aValueList]
        newAvalueList.splice(index,1)
        setAvalueList(newAvalueList)
    }



    return (
        <div>
            <div>
                <input type="text" value={aValue} onChange={(e) => setAvalue(e.target.value)} onBlur={Blur} />
                <Button onClick={handleAdding} >
                    Add
                </Button>
                {aValueList.map((value, index) => {
                    return (
                        <div  key={index}>
                            <p>{value.A}</p>
                            <Button onClick={(e) => handleDeleting(index,e)} >
                                Delete
                            </Button>
                        </div>
                    )
                })}
            </div>
            <Link to='/'>
                <Button>
                    Back
                </Button>
            </Link>
        </div>
    )
}

export default Form