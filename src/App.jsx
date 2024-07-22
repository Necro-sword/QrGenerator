
import { useState } from 'react'
import './App.css'

function App() {
  const [img,setImg]=useState("");
  const [Loading,setLoading]=useState(false);
  const [qrData,setQrData]=useState("https://www.youtube.com/@freedeathyt");
  const [qrSize,setQrSize]=useState("150");


   async function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);


    }catch(error){
      console.error("error in the generating QR",error);
    }finally{
      setLoading(false);
    }
  }

  function downloadQR(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link =document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrimage.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    }).catch((error)=>{
      console.error("error in downloading QR code",error);
    });

  }

   return (
    <div className='qr-container'>
      <h1>QR CODE GENERATOR</h1>
      {Loading && <p>QR Loading....</p>}
      {img && <img src={img} alt="QR" className='qr-img' />}
      <div>
        
         <label htmlFor="data-input" className='input-label'>
           Data For QR Code
         </label>
         <input type="text" id='data-input' value={qrData} placeholder='Enter Data for QR Code' onChange={(e)=>setQrData(e.target.value)} />
         <label htmlFor="size-input" className='input-label'>sixe of QR (eg:150)</label>
         <input type="text" id='size-input' value={qrSize} placeholder='enter the size of QR code' onChange={(e)=>setQrSize(e.target.value)} />
         <button className='generate-button' disabled={Loading} onClick={generateQR}>Generate QR Code</button>
         <button className='download-button' onClick={downloadQR}>Download QR Code</button>

      </div>
      

    </div>
  )
}

export default App
