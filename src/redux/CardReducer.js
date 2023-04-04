import { ADD_HISTORY, EDITCARD_NAME, ON_BUCKET_CHANGENAME, ON_DELETE, ON_DRAG_DROP, ON_LINKEDIT, ON_SELECT,MULTICARDDELETE, NEWCARD } from "./Cardtypes"

export const Cards={
    bucket1:{id:21,name:'Education',items:[{id:1,name:'RavindraBabu Ravula',selected:false,link
    : 
    "http://youtu.be/KZ5ljG59jvU"},{id:2,name:'Abdul Bari',selected:false,link
    : 
    "http://youtu.be/-JTq1BFBwmo"},{id:3,name:'Subbarao',selected:false,link
    : 
    "http://youtu.be/G8FKSNTDa4M"},]},
    bucket2:{id:22,name:'Entertainment',items:[{id:11,name:'Rajinikanth',selected:false,link
    : 
    "http://youtu.be/DObwdl3xB7U"},{id:12,name:'Kamal Haasan',selected:false,link
    : 
    "http://youtu.be/aoi11BdfpoM"},{id:13,name:'Rolex',selected:false,link
    : 
    "http://youtu.be/rBLCjz8as0E"}]},
    History:{id:23,name:'History',items:[]}
}
const change_name=(state,action)=>{
    if(action.payload==='')return {...state}
    state[`bucket${action.bucket}`].name=action.payload
    return {...state}
}
const editcard_name=(state,action)=>{
    if(action.payload==='')return{...state}
    state[`bucket${action.bucket}`].items[action.index].name=action.payload
    return {...state}
}
const on_drag_drop=(state,action)=>{
    state.bucket1.items=action.payload[0]
    state.bucket2.items=action.payload[1]
    return {...state}
}
const on_select=(state,action)=>{
    state[`bucket${action.bucket}`].items[action.index].selected=!state[`bucket${action.bucket}`].items[action.index].selected
    return {...state}
}
const on_linkedit=(state,action)=>{
    if(action.payload==='') return{...state}
    state[`bucket${action.bucket}`].items[action.index].link=action.payload
    return {...state}
}
const add_history=(state,action)=>{
    state.History.items.push({name:action.name,link:action.payload,time:action.time})
    return {...state}
}
const on_delete=(state,action)=>{
    state[`bucket${action.bucket}`].items.splice(action.index,1)
    return {...state}
}
const on_multidelete=(state,action)=>{
    let arr=state[`bucket${action.bucket}`].items.filter(item=>item.selected!==true)
    state[`bucket${action.bucket}`].items=arr
    return{...state}
}
const newcard=(state,action)=>{
    state[`bucket${action.bucket}`].items.unshift(action.payload)
    return{...state}
}
const cardsReducer=(state=Cards,action)=>{
    switch(action.type){
        case ON_BUCKET_CHANGENAME:return state=change_name(state,action) 
        case EDITCARD_NAME:return state=editcard_name(state,action)
        case ON_DRAG_DROP:return state=on_drag_drop(state,action)
        case ON_SELECT:return state=on_select(state,action)
        case ON_LINKEDIT:return state=on_linkedit(state,action)
        case ADD_HISTORY:return state=add_history(state,action)
        case ON_DELETE:return state=on_delete(state,action)
        case MULTICARDDELETE:return state=on_multidelete(state,action)
        case NEWCARD:return state=newcard(state,action)
        default:return state
    }
}

export default cardsReducer