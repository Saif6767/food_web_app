import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import AddItems from './components/AddItems';
import Order from './components/Order';
import List from './components/List';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<AddItems />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </>
  )
}

export default App