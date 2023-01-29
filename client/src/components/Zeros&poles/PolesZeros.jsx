import React from 'react'
import './PolesZeros.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useState } from 'react'

const PolesZeros = () => {
    const [mode, setMode] = useState(false)

    const mouseMove = (event) => {
        var x = event.clientX;
        var y = event.clientY;
        console.log(x);
        console.log(y);
    }

    const mouseLeave = () => {
        console.log("mouseLeave");
    }
    console.log(mode);

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
            <div className='circle-container'>
                <div className='separator1'></div>
                <div className='separator2'></div>
                <div className='circle' onMouseMove={mouseMove} onMouseLeave={mouseLeave} ></div>
            </div>
        </>
    )
}

export default PolesZeros