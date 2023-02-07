import React, { createContext, useState } from 'react';
const FileContext = createContext();

const FileContextProvider = ({ children }) => {

    // zeros & poles component

    const [mode, setMode] = useState(false)
    const [positionX, setPositionX] = useState()
    const [positionY, setPositionY] = useState()
    const [pointsList,setPointList] = useState([])
    const [frequency,setFrequency] = useState([])
    const [phase,setPhase] = useState([])
    const [magnitude,setMagnitude] = useState([])

    // signals component

    const [countXaxis, setCountXaxis] = useState(0)
    const [signalPositionY, setSignalpositionY] = useState([])
    const [Xaxis, setXaxis] = useState([])

    return (
        <FileContext.Provider
            value={{
                mode,
                setMode,
                positionX,
                setPositionX,
                positionY,
                setPositionY,
                pointsList,
                setPointList,
                signalPositionY,
                setSignalpositionY,
                Xaxis,
                setXaxis,
                countXaxis,
                setCountXaxis,
                frequency,
                setFrequency,
                phase,
                setPhase,
                magnitude,
                setMagnitude
            }}>
            {children}
        </FileContext.Provider>
    );
};

export { FileContext, FileContextProvider };