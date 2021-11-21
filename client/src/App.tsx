import React from 'react';
import './App.css';
import {MainPage} from "./Components/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CategoriesPage} from "./Components/CategoriesPage/CategoriesPage";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/Categories" element={<CategoriesPage/>}/>
          <Route path="*" element={<div>Page not found</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
