import { useEffect, useState } from 'react';
import './App.css';
import image0 from './images/0.jpg';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
const images = [
  image0,
  image1,
  image2,
  image3
]
function App() {
  const [bigImage,setBigImage] = useState(image0);
  const [selectedImage,setSelectedImage] = useState(0);
  const [startSlideShow,setStartSlideShow] = useState(false)
  const handleSelectedImage = (i) => {
    setSelectedImage(i)
  }
  const nextImage = () => {
    setSelectedImage(selectedImage+1);
    if(selectedImage>2){
      setSelectedImage(3)
      return
    }
    setBigImage(images[selectedImage+1])
  }
  const prevImage = () => {
    if(selectedImage==0){
      return
    }
    setBigImage(images[selectedImage-1])
    setSelectedImage(selectedImage-1)
  }
  const handleChange = (event) => {
    setStartSlideShow(event.target.checked);
  }
  useEffect(()=>{
    if(startSlideShow){
      var intervell = setInterval(()=>{
        setSelectedImage(selectedImage+1);
        setBigImage(images[selectedImage+1])
        if(selectedImage==3){
          prevImage();
        }
      },3000)
    }
    return () => clearInterval(intervell);
  })
  return (
    <div style={{textAlign:"center"}}>
      <img src={bigImage} style={{width:"300px"}} />
      <br />
      <button onClick={prevImage}>Previous</button>
      {images.map((img,i)=>{
        return <img key={i} src={img} className={selectedImage==i?"selected":"not"} onClick={()=>{setBigImage(img);handleSelectedImage(i)}} style={{maxHeight:"100px",margin:"20px",cursor:"pointer"}} />  
      })}
      <button onClick={nextImage}>Next</button>
      <br />
      <input type="checkbox" onChange={handleChange} />State SlideShow
    </div>
  );
}

export default App;
