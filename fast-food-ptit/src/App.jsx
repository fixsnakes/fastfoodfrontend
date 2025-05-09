import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../components/Navbar'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';  // Import BrowserRouter để quản lý route
import Login from '../pages/Login'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import OrderSuccess from '../pages/OrderSuccess'

function App() {
  

  return (
    <>
      <Router>

          {/* Navbar components */}
          <Navbar></Navbar>
            {/* Define Routes */}
          <Routes>
            {/* Render page Login */}
            <Route path='/ordersuccess' element={<OrderSuccess></OrderSuccess>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path="/login" element={<Login />} />  
            <Route path="/home" element={<Home />} /> 
          </Routes>
      </Router> 
     
      
    </>
  )
}

export default App
