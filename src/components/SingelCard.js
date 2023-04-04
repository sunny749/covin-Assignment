import React from 'react'
import { Button, Card } from 'react-bootstrap'
import emptyProfile from './emptyProfile.png'
import {useState} from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_HISTORY, EDITCARD_NAME, ON_LINKEDIT,ON_DELETE } from '../redux/Cardtypes'
import { ON_SELECT } from '../redux/Cardtypes'
import { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import {HiLink} from 'react-icons/hi'
import {TiTickOutline} from 'react-icons/ti'
import '../components/Styles.css'



function SingelCard({name,id,index,bucket,selected,link,setUrl}) {
    const [input,setInput]=useState(false)
    const inputref=useRef()
    const [video,setVideo]=useState(false)
    const videoRef=useRef()
    const dispatch=useDispatch()
    const editname_Handler=(e)=>{
        if(input===false){
            setInput(!input)
        }
        else{
            dispatch({type:EDITCARD_NAME,payload:inputref.current.value,bucket:bucket,index:index})
            setInput(!input)
        }
    }
    useEffect(()=>{
        if(input===true){
            inputref.current.focus()
        }
        if(video===true){
            videoRef.current.focus()
        }
    },[input,video])
    const on_select=(e)=>{
        dispatch({type:ON_SELECT,bucket:bucket,index})
    }
    const on_editLink=(e)=>{
        if(video===false){
            setVideo(prev=>!prev)
        }
        else{
            dispatch({type:ON_LINKEDIT,payload:videoRef.current.value,bucket:bucket,index:index})
            setVideo(prev=>!prev)
        }
    }
    const video_clickHandler=(e)=>{ 
        setUrl(link)
        dispatch({type:ADD_HISTORY,payload:link,name:name,time:new Date().toLocaleString()})
    }
  return (
    <Draggable draggableId={id.toString()} index={index}>
        {
            (provided)=>(
                <Card 
                className='d-flex border rounded mt-2 p-2'
                {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} 
                >
                <Card.Img variant="top" src="" />
                {input?<input placeholder='enter name' ref={inputref}></input>:<span style={{flex:1}} className='d-flex flex-column fw-bold fs-4 align-items-start'>{name}</span>}
                {video?<input placeholder='enter the link' ref={videoRef}></input>:<span className='fs-4' onClick={(e)=>{video_clickHandler(e)}}>click here to watch the video</span>}
                <div>
                    <Button className='icon' onClick={(e)=>editname_Handler(e)}>{input?'SaveName':'EditName'}</Button>
                    <Button className='icon' onClick={(e)=>on_editLink(e)}>{video?'SaveLink':'EditLink'}</Button>
                    <Button className='icon' onClick={(e)=>{dispatch({type:ON_DELETE,index:index,bucket:bucket})}}><AiFillDelete/></Button>
                    {selected?<span onClick={(e)=>on_select(e)} className='icon' style={{color:'red'}}><TiTickOutline/></span>:<span onClick={(e)=>on_select(e)} className='icon'><TiTickOutline/></span>}
                </div>
                {provided.placeholder}
                </Card>
            )
        }
    </Draggable>
  )
}

export default SingelCard