import React from 'react'
import PageHeader from '../../component/pageheader'
import { useNavigate } from 'react-router-dom'

function LiveScreen() {
  const navigate=useNavigate()
  return (
    <div>
        <PageHeader title={"Live"}  goBack={()=>navigate('/Auth/home')}/></div>
  )
}

export default LiveScreen