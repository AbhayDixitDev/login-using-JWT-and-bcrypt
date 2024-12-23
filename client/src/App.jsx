import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Layout from './Layout';

const App = () => {
    return (
       <BrowserRouter>
       <Routes>
        <Route path="/" element ={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="register" element={<Register/>}/>       
        </Route>
      
       </Routes>
       </BrowserRouter>
    );
};

export default App;