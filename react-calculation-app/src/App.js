import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LikertTool from './components/LikertTool/LikertTool';
import IntervalTool from './components/IntervalTool/IntervalTool';
import Instructions from './components/Instructions/Instructions';
import TopBar from './components/TopBar/TopBar';
import './App.module.css';

const App = () => {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/likert-tool" component={LikertTool} />
        <Route path="/interval-tool" component={IntervalTool} />
        <Route path="/instructions" component={Instructions} />
        {/* Другие маршруты и компоненты */}
      </Switch>
    </Router>
  );
};

export default App;
