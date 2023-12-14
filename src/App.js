import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './views/home/Home';
import Planet from './views/planet/Planet';

function App() {
  return (
    <Router>
      <Routes>   
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;

