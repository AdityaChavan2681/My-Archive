import React, { useState } from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import AuthPanel from '../../Components/AuthPanel/AuthPanel';
import { adminAuth } from '../../api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(adminAuth.getToken()));

  if (!isAuthenticated) {
    return (
      <div className='admin' style={{ justifyContent: "center", padding: "40px" }}>
        <AuthPanel onSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/editproduct/:slug' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
        <Route path='*' element={<AddProduct />} />
      </Routes>
    </div>
  )
}

export default Admin
