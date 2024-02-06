import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <nav className="top-bar">
      <div className="logo">BeCoMe</div>
      <div className="navigation">
        <a href="#instructions">Instructions</a>
        <a href="#likert-tool">Likert Tool</a>
        <a href="#interval-tool">Interval Tool</a>
      </div>
    </nav>
  );
};

export default TopBar;
