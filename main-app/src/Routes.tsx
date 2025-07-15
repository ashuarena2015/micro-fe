import React from 'react';
import { Routes, Route } from "react-router-dom";
import TodoList from './components/TodoList';
import Users from './components/Users';
import Layout from './components/Layout';
import PublicLayoutWrapper from './components/Layout/PublicLayout';
import Dashboard from './components/Dashboard';
import ProfileApp from './routes/ProfileRoutes';
import ChildApp from './routes/ChildAppRoutes';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayoutWrapper />}>
        <Route path="/" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/child" element={<ChildApp />} />
        <Route path="/profile" element={<ProfileApp />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
