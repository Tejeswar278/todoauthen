import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
