import React from 'react'
import ReactDom from 'react-dom'
import ReactPlayer from 'react-player'

function Modal({url,setModal}) {
  return ReactDom.createPortal(
    <>
    <div style={{position:'fixed',top:'0',bottom:'0',right:'0',left:'0',backgroundColor:'rgba(0,0,0,0.7'}}></div>
     <div style={{position:'fixed',top:'50%',left:'50%',
        transform:'translate(-50%,-50%)',backgroundColor:'white',
        
      }}>
        <ReactPlayer controls={true} volume={0} playing={true} url={url} />
      
        <div onClick={()=>{setModal(false)}} style={{padding:'3px',cursor:'pointer',textAlign:'center',color:'red',backgroundColor:'black'}}>close video</div>
    </div>
    </>
   ,document.getElementById('portal')
  )
}

export default Modal