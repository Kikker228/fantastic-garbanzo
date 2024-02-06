import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    <div>
      <div className="main-container">
        <h1>Welcome to BeCoMe</h1>
        <p className="introduction">
          Discover how experts can express their opinion through our tools. Get started by choosing one of the options below.
        </p>
        <div className="buttons-container">
          <button className="btn">Likert Tool</button>
          <button className="btn">Interval Tool</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
