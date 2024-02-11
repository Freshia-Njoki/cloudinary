import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [files, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImg, setUpload] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader(); 
    reader.readAsDataURL(file); //turn the file in a readable url

    reader.onloadend = () => {
      setImage(reader.result)
    }
    console.log(image);
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(files);
    previewFiles(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8001", {image: image})
    try {
      const uploadedImage = result.data.public_id;   
      setUpload(uploadedImg)
    } catch (error) {
      console.log(error);     
    }
  }

  return (
    <>
    <div className="container mt-5 align-items-center justify-content-center">
    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="fileInput">Upload your photo here</label>
      <input type="file" id="fileInput" onChange={(e) => handleChange(e)} required accept="image/png, image/jpeg, image/jpg, image/jfif"/>
    <button className="btn btn-primary">submit</button>
    </form>
    </div>
    <img src={image} alt="" />
      
    </>
  )
}

export default App
