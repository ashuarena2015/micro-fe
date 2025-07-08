import React from 'react';
import { Routes, Route } from "react-router-dom";
import TodoList from './components/TodoList';
import Users from './components/Users';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

// ts-ignore
const ChildApp = React.lazy(() => import("childApp/App"));

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/child" element={<ChildApp />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
