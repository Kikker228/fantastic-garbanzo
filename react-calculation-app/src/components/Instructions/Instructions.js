import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <section id="instructions" className="instructions-section">
      <h2>How to Use BeCoMe</h2>
      <p>Follow the steps below to express your expert opinion using our tools:</p>
      <ol className="instructions-list">
        <li>Choose the tool you want to use: Likert or Interval.</li>
        <li>Read the provided case study to understand the context.</li>
        <li>Use the tool to submit your opinion.</li>
        <li>Review the summary of your inputs.</li>
      </ol>
    </section>
  );
};

export default Instructions;
