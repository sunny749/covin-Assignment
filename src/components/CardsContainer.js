import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingelCard from './SingelCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useRef } from 'react'
import { MULTICARDDELETE, NEWCARD, ON_BUCKET_CHANGENAME } from '../redux/Cardtypes'
import { ON_DRAG_DROP } from '../redux/Cardtypes'
import { useEffect } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import {DragDropContext} from 'react-beautiful-dnd'
import Modal from './Modal'
import NewCard from './NewCard'

export default function CardsContainer() {
    const [newCard1,setNewCard1]=useState(false)
    const [newCard2,setNewCard2]=useState(false)
    const [input1,setInput1]=useState(false)
    const [modal,setModal]=useState(false)
    const [linkurl,setLink]=useState('')
    const [input2,setInput2]=useState(false)
    const nameref=useRef()
    const linkref=useRef()
    const nameref2=useRef()
    const linkref2=useRef()
    const inputref1=useRef(null)
    const inputref2=useRef(null)
    let store=useSelector(state=>state)
    const dispatch=useDispatch()
    console.log(store)
    const bucket_nameChangehandler=(inp,setinp,ref,bucket)=>{
      if(inp===false){
        setinp(prev=>!prev)
      }
      else{
        dispatch({type:ON_BUCKET_CHANGENAME,bucket:bucket,payload:ref.current.value})
        setinp(prev=>!prev)
      }
    }
    const multicarddelete_Handler=(bucket)=>{
      dispatch({type:MULTICARDDELETE,bucket:bucket})
    }
    useEffect(()=>{
      if(input1===true){
        inputref1.current.focus()
      }
      if(input2===true){
        inputref2.current.focus()
      }
    },[input1,input2])
    const onDragEnd=(result)=>{
      const {source,destination}=result
      if(!destination) return;
      if(destination.droppableId===source.droppableId&&destination.index===source.index) return;
      let add,
        education=store.bucket1.items,
        entertainment=store.bucket2.items
      if(source.droppableId==='educationcards'){
        add=education[source.index]
        education.splice(source.index,1)
      }
      else{
        add=entertainment[source.index]
        entertainment.splice(source.index,1)
      }
      if(destination.droppableId==='educationcards'){
        education.splice(destination.index,0,add)
      }
      else{
        entertainment.splice(destination.index,0,add)
      }
      console.log(education,entertainment)
      dispatch({type:ON_DRAG_DROP,payload:[education,entertainment]})
    }
    const setUrl=(url)=>{
      if(url!==''){
        setLink(url)
        setModal(true)
      }
    }
    const submitHandler=(bucket,ref1,ref2,setter)=>{
      let name=ref1.current.value
      let link=ref2.current.value
      if(name===''||link===''){
        setter(false)
        return
      }
      let obj={
        id:Number(new Date().getTime().toString().slice(9,)),
        name:name,
        selected:false,
        link:link,
      }
      dispatch({type:NEWCARD,payload:obj,bucket:bucket})
      setter(false)
    }
   
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='d-md-flex mt-2 justify-content-between align-items-start mx-auto ' >
          <Droppable droppableId='educationcards'>
            {
              (provided)=>(
            <div style={{backgroundColor:'lightskyblue'}} className='w-100 d-md-flex w-50 flex-column p-2 rounded' ref={provided.innerRef} {...provided.droppableProps}>
            <div>
              {
              input1?<input ref={inputref1}></input>:<span className='fw-bold fs-3'>{store.bucket1.name}</span>
            }
            <span style={{backgroundColor:"lightgray",margin:'3px',cursor:'pointer',border:'solid'}} onClick={()=>bucket_nameChangehandler(input1,setInput1,inputref1,1)}>{input1?'save':'edit'}</span>
            <span style={{backgroundColor:"lightgray",margin:'3px',cursor:'pointer',border:'solid'}} onClick={()=>multicarddelete_Handler(1)}>multicarddelete</span>
            <span style={{backgroundColor:"lightgray",margin:'3px',cursor:'pointer',border:'solid'}} onClick={()=>setNewCard1(prev=>!prev)}>newcard</span>
            </div>
            {
                store.bucket1.items.map((card,index)=>{
                  return <SingelCard link={card.link} setUrl={setUrl} key={card.id} selected={card.selected} index={index} bucket={1} id={card.id} name={card.name}/>
                    })
            }
          <NewCard open={newCard1}  onSubmit={()=>submitHandler(1,nameref,linkref,setNewCard1)} close={()=>setNewCard1(false)}> 
            <div>
              <input ref={nameref} placeholder='enter name' type="text" />
              <input ref={linkref} placeholder='enter video link' type="text" />
            </div>
          </NewCard>
            {provided.placeholder}
          </div>
              )
            }
          </Droppable>
          <Droppable droppableId='entertainment'>
            {
              (provided)=>(
            <div style={{backgroundColor:'lightgreen'}} className='w-100 d-md-flex w-50 flex-column p-2 rounded' ref={provided.innerRef} {...provided.droppableProps}>
            <div>
              {
              input2?<input ref={inputref2}></input>:<span className='fw-bold fs-3'>{store.bucket2.name}</span>
            }
            <span style={{backgroundColor:"lightgray",margin:'3px',cursor:'pointer',border:'solid'}} onClick={()=>bucket_nameChangehandler(input2,setInput2,inputref2,2)}>{input2?'save':'edit'}</span>
            <span style={{backgroundColor:"lightgray",margin:'3px',cursor:'pointer',border:'solid'}} onClick={()=>multicarddelete_Handler(2)}>multicarddelete</span>
            <span style={{backgroundColor:"lightgray",margin:'3px',cursor:'pointer',border:'solid'}} onClick={()=>setNewCard2(prev=>!prev)}>newcard</span>
            </div>
            {
                store.bucket2.items.map((card,index)=>{
                  return <SingelCard link={card.link} setUrl={setUrl}  key={card.id} selected={card.selected} index={index} bucket={2} id={card.id} name={card.name}/>
                    })
            }
            {provided.placeholder}
            <NewCard open={newCard2}  onSubmit={()=>submitHandler(2,nameref2,linkref2,setNewCard2)} close={()=>setNewCard2(false)}> 
            <div>
              <input ref={nameref2} placeholder='enter name' type="text" />
              <input ref={linkref2} placeholder='enter video link' type="text" />
            </div>
          </NewCard>
          </div>
              )
            }
          </Droppable>
          {modal?<Modal url={linkurl} setModal={setModal}/>:null}
          </div>  
        </DragDropContext>
  )
}
