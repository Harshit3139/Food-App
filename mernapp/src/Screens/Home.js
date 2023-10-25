import React from 'react'
import Navbar from '../Components/Navbar'
import Foter from '../Components/Foter'
import Card from '../Components/Card'
import Crousal from '../Components/Crousal'


export default function Home() {
  return (
    <div>
    <div> <Navbar/> </div>
    <div><Crousal/></div>
    <div className='m-3'><Card/></div>
    <div> <Foter/></div>
      
    </div>
  )
}

