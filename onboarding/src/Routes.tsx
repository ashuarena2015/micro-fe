import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Profile from './components/Profile';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
