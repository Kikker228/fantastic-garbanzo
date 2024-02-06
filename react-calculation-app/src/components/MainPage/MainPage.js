import React from 'react';
import { Link } from 'react-router-dom';

import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="header">
        <h1>Welcome to BeCoMe</h1>
        <p className="introduction">
          Discover how experts can express their opinions through our tools. Get started by choosing one of the options below.
        </p>
      </div>

      <div className="content">
        <h2>Introduction</h2>
        <p>
          Real-world systems are influenced by many ambiguous circumstances, which complicates planning, modeling, prediction of these systems and decision-making. Therefore, decision-making procedures often rely on the opinions of experts who express their standpoints from their own perspective. Depending on the structure of expert teams, experts’ opinions can vary broadly or may even contradict. Finding the best possible compromise of experts’ opinions is a basic need in such situations. Over many years of research at Czech University of Life Sciences in Prague (ČZU), we have developed the unique BeCoMe (Best-Compromise-Mean) method for determining the optimum group decision, which corresponds to the best compromise/agreement of all experts’ opinions. The optimum decision is a result of a computationally complex fuzzy set mathematical model based on minimizing entropy.<br />
          The submitted tool based on the optimum BeCoMe method is a unique, helpful, and easily available instrument in many decision-making situations, such as for decisions related to state security, public health, investments, flood prevention, energetic self-sufficiency, or IT contracts.
        </p>
        <div className="tool-description">
          <h2>Likert Tool</h2>
          <p>
            Use the Likert Tool to collect expert opinions expressed as Likert linguistic terms. This tool helps in decision-making by quantifying subjective opinions.
          </p>
        </div>

        {/* Interval Tool Description */}
        <div className="tool-description">
          <h2>Interval Tool</h2>
          <p>
            The Interval Tool is designed to gather expert opinions as fuzzy numbers or intervals. It allows experts to provide more nuanced data for complex decision-making.
          </p>
        </div>
      </div>

      <div className="buttons-container">
        <Link to="/likert-tool">
          <button className="btn likert-btn">Likert Tool</button>
        </Link>
        <Link to="/interval-tool">
          <button className="btn interval-btn">Interval Tool</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
