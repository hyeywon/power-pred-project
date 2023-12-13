import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Signup1 from "./pages/signUp/Signup1";
import Signup2 from './pages/signUp/Signup2';
import Login from "./pages/login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup1 />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;