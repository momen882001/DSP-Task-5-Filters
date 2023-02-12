import React, {useState} from 'react'
import './slider.css';
import img1 from '../../assets/images/-0.3.png'
import img2 from '../../assets/images/-0.7.png'
import img3 from '../../assets/images/-1.1.png'
import img4 from '../../assets/images/-1.5.png'
import img5 from '../../assets/images/0.3.png'
import img6 from '../../assets/images/0.7.png'
import img7 from '../../assets/images/1.1.png'
import img8 from '../../assets/images/1.5.png'
import img9 from '../../assets/images/0.5j.png'
import img10 from '../../assets/images/0.9j.png'
import img11 from '../../assets/images/1.1j.png'
import img12 from '../../assets/images/1.5j.png'
import img13 from '../../assets/images/(-0-0.5j).png'
import img14 from '../../assets/images/(-0-0.9j).png'
import img15 from '../../assets/images/(-0-1.1j).png'
import img16 from '../../assets/images/(-0-1.5j).png'
import img17 from '../../assets/images/(0.5+0.3j).png'


import { useContext} from 'react'
import { FileContext } from '../contexts/fileContext'
// import axios from '../Global/axios'

function Slider() {

  const {
    setAvalue
} = useContext(FileContext);
  
  const imgs=[
    {id:0, path: img1 , value :"-0.3"},
    {id:1, path: img2 , value :"-0.7"},
    {id:2, path: img3 , value :"-1.1"},
    {id:3, path: img4 , value :"-1.5"},
    {id:4, path: img5 , value :"0.3"},
    {id:5, path: img6 , value :"0.7"},
    {id:6, path: img7 , value :"1.1"},
    {id:7, path: img8 , value :"1.5"},
    {id:8, path: img9 , value :"0.5j"},
    {id:9, path: img10 , value :"0.9j"},
    {id:10, path: img11 , value :"1.1j"},
    {id:11, path: img12 , value :"1.5j"},
    {id:12, path: img13 , value :"-0.5j"},
    {id:13, path: img14 , value :"-0.9j"},
    {id:14, path: img15 , value :"-1.1j"},
    {id:15, path: img16 , value :"-1.5j"},
    {id:16, path: img17 , value :"(0.5+0.3j)"},
    // {id:5, path: img7 , value :"0.9j"},
    // {id:0, path: img1 , value :"-0.3"},
    // {id:1, path: img2 , value :"-0.7"},
    // {id:2, path: img4 , value :"-1.1"},
    // {id:3, path: img5 , value :"-1.5"},
    // {id:4, path: img6 , value :"0.5j"},
    // {id:5, path: img7 , value :"0.9j"},
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
          <img alt='not loaded' className={wordData.id === i ?"clicked":""} src={data.path} onClick={()=>handleClick(i)} height="120" width="230" />
        </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
