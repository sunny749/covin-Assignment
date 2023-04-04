import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function History() {
    const {History}=useSelector(state=>state)
    console.log(History)
  return (
    <Table className='tabel-xs' bordered striped hover>
        <thead>
          <tr>
          <th>#</th>
          <th>Name</th>
          <th>Video Link</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {
            History.items.map((hist,index)=>{
                return <tr><td>{index+1}</td><td>{hist.name}</td><td>{hist.link}</td><td>{hist.time}</td></tr>
            })
        }
      </tbody>
    </Table>
  )
}
