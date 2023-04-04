import React from 'react'
import ReactDom from 'react-dom'

export default function NewCard({open,onSubmit,close,children}) {
  if(!open)return null
  else{
    return ReactDom.createPortal(
      <>
        <div style={{position:'fixed',top:'0',bottom:'0',right:'0',left:'0',backgroundColor:'rgba(0,0,0,0.7'}}></div>
        <div style={{position:'fixed',top:'50%',left:'50%',
        transform:'translate(-50%,-50%)',backgroundColor:'white',
        padding:'50px'
      }}>
        {children}
        <button onClick={close}>close</button>
        <button onClick={onSubmit}>submit</button>
        </div>
      </>
      ,
      document.getElementById('portal')
    )
  }
}
