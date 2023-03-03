import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dialogue from "./components/Dialogue";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dialogue" element={<Dialogue/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
  </>
  );
}


export default App;
