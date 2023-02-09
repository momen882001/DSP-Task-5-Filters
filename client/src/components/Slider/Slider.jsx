import React, {useState} from 'react'
import './slider.css';
import img1 from '../../assets/images/-0.3.png'
import img2 from '../../assets/images/-0.5.png'
import img3 from '../../assets/images/-0.7.png'
import img4 from '../../assets/images/-1.1.png'
import img5 from '../../assets/images/-1.5.png'
function Slider() {
  
  const imgs=[
    {id:0,value: img1},
    {id:1,value: img2},
    {id:2,value: img3},
    {id:3,value: img4},
    {id:4,value: img5},
  ]
  const [wordData,setWordData]=useState(imgs[0])
  const handleClick=(index)=>{
    console.log(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  return (
    <div className="main" >
      <img src={wordData.value} height="200" width="400" /> 
      <div className='flex_row'>
        {imgs.map((data,i)=>
        <div className="thumbnail" key={i} >
          <img className={wordData.id==i?"clicked":""} src={data.value} onClick={()=>handleClick(i)} height="70" width="100" />
        </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
