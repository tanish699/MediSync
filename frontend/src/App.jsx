import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reminders from './pages/Reminders';
import Inventory from './pages/Inventory';
import Family from './pages/Family';
import AddReminder from './addButtonScreens/AddReminder';
import AddMedicine from './addButtonScreens/AddMedicine';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/reminders/add" element={<AddReminder />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/add" element={<AddMedicine />} />
        <Route path="/family" element={<Family />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
