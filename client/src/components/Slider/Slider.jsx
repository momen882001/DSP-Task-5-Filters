import React from 'react'
import './slider.css';
function slider() {
  
  const imgs=[
    {id:0,value:"assets\all_pass_filters\-0.3.png"},
    {id:1,value:"assets\all_pass_filters\-0.5.png"},
    {id:2,value:"assets\all_pass_filters\(-0-0.5j).png"},
  ]
  const [wordData,setWordData]=useState(imgs[0])
  const handleClick=(index)=>{
    console.log(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  return (
    <div className="main">
      <img src={wordData.value} height="300" width="500" /> 
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

export default slider;
