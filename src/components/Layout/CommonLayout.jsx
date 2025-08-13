import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'

export default function CommonLayout() {
  return (
    <div className='container mx-auto'>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
