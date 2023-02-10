import React, {useState} from 'react'
import './slider.css';
import img1 from '../../assets/images/-0.3.png'
import img2 from '../../assets/images/-0.5.png'
import img3 from '../../assets/images/-0.7.png'
import img4 from '../../assets/images/-1.1.png'
import img5 from '../../assets/images/-1.5.png'
import { useContext} from 'react'
import { FileContext } from '../contexts/fileContext'
// import axios from '../Global/axios'

function Slider() {

  const {
    setAvalue
} = useContext(FileContext);
  
  const imgs=[
    {id:0, path: img1 , value :"-0.3"},
    {id:1, path: img2 , value :"-0.5"},
    {id:2, path: img3 , value :"-0.7"},
    {id:3, path: img4 , value :"-1.1"},
    {id:4, path: img5 , value :"-1.5"},
  ]
  const [wordData,setWordData]=useState(imgs[0])
  const handleClick=(index)=>{
    console.log(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
    imgs.map((data) => {
      if (data.id === index) {
        setAvalue(data.value)
      }
      return data.value
    })
  }
  return (
    <div className="main" >
      <img alt='not loaded' src={wordData.path} height="200" width="400" /> 
      <div className='flex_row'>
        {imgs.map((data,i)=>
        <div className="thumbnail" key={i} >
          <img alt='not loaded' className={wordData.id === i ?"clicked":""} src={data.path} onClick={()=>handleClick(i)} height="70" width="100" />
        </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
