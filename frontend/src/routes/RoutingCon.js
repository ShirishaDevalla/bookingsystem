import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../components/Homepage'
import AddNewEntry from '../components/AddNewEntry'
import Table from '../components/Table'
import Update from '../components/Update'




const RoutingCon = () => {
  return (
    <BrowserRouter>
    <Routes>
      
        <Route path='/' element={<Homepage/>}/>
        <Route path='/addnewentry' element={<AddNewEntry/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/table' element={<Table />}/>
  
    </Routes>
    </BrowserRouter>
  )
}

export default RoutingCon