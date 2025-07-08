import React from 'react';
import { Routes, Route } from "react-router-dom";
import TodoList from './components/TodoList';
import Users from './components/Users';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/child" element={<AboutUs />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
