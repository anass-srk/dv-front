import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import "./App.css"
import Signup from './Signup.tsx';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={Login()} />
      <Route path='/signup' element={Signup()} />
    </Routes>
  </BrowserRouter>
);
