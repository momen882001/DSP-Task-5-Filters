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
    const [signalYupdated, setSignalYupdated] = useState([])
    const [Xaxis, setXaxis] = useState([])

    // import/export

    // This state will store the parsed data
    const [data, setData] = useState([]);
     
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
     
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");


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
                setMagnitude,
                signalYupdated,
                setSignalYupdated,
                data,
                setData,
                error,
                setError,
                file,
                setFile
            }}>
            {children}
        </FileContext.Provider>
    );
};

export { FileContext, FileContextProvider };