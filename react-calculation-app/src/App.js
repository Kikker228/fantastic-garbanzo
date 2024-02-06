import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LikertTool from './components/LikertTool/LikertTool';
import IntervalTool from './components/IntervalTool/IntervalTool';
import Instructions from './components/Instructions/Instructions';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import './App.module.css';

const App = () => {
  return (
    <Router>
      <TopBar />
        <Routes>
          <Route exact path="/" element={<MainPage />}/>
          <Route path="/likert-tool" element={<LikertTool />} />
          <Route path="/interval-tool" element={<IntervalTool />} />
          <Route path="/instructions" element={<Instructions />} />
          {/* Другие маршруты и компоненты */}
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
