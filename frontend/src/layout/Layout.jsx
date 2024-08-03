// src/components/Layout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import MobileNavBar from '../components/common/MobileNavBar';



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="flex-1 ">
          <Outlet />
        </main>
        <MobileNavBar/>
      </div>
  );
};

export default Layout;
