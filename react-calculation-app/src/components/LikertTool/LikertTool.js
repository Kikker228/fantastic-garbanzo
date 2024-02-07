// LikertTool.js
import React, { useState } from 'react';
import axios from 'axios';
import './LikertTool.css';

function LikertTool() {
  const [expertCount, setExpertCount] = useState(1);
  const [expertData, setExpertData] = useState(Array.from({ length: expertCount }, () => ({ value: '' })));
  const [result, setResult] = useState(null);

  const handleSelectChange = (index, value) => {
    const newExpertData = [...expertData];
    newExpertData[index] = { value };
    setExpertData(newExpertData);
  };

  const handleCalculate = async () => {
    const selectedAnswers = expertData
      .filter((item) => item.value !== '')
      .map((item) => {
        switch (item.value) {
          case 'Strongly disagree':
            return [0];
          case 'Rather disagree':
            return [25];
          case 'Neutral':
            return [50];
          case 'Rather agree':
            return [75];
          case 'Strongly agree':
            return [100];
          default:
            return [0];
        }
      });

    try {
      const response = await axios.post('http://kikker.online:3000/calculate', {
        expertData: selectedAnswers,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error.message);
    }
  };

  const handleAddExpert = () => {
    setExpertCount(expertCount + 1);
    setExpertData([...expertData, { value: '' }]);
  };

  const handleRemoveExpert = (index) => {
    if (expertCount === 1) return;
    setExpertCount(expertCount - 1);
    const newExpertData = [...expertData];
    newExpertData.splice(index, 1);
    setExpertData(newExpertData);
  };

  return (
    <div className="likert-tool">
      <h1>Proposal in Likert</h1>
      <div className="usage-instructions">
        <h2>Usage Instructions</h2>
        <p>
          Welcome to the Likert Tool! This tool helps you collect expert opinions expressed as Likert linguistic terms. Follow these steps:
        </p>
        <ol>
          <li>Enter expert opinions in the input table.</li>
          <li>Click the "Calculate" button to obtain the results.</li>
          <li>Review the results to make informed decisions.</li>
        </ol>
      </div>
      <div className="expert-counter">
        <label>Number of Experts: </label>
        <input
          type="number"
          value={expertCount}
          min={1}
          onChange={(e) => {
            const count = parseInt(e.target.value);
            if (!isNaN(count) && count >= 1) {
              setExpertCount(count);
              setExpertData(Array.from({ length: count }, () => ({ value: '' })));
            }
          }}
        />
      </div>
      <div className="input-table">
        {expertData.map((item, index) => (
          <div key={index} className="row">
            <select
              value={item.value}
              onChange={(e) => handleSelectChange(index, e.target.value)}
            >
              <option value="">Select</option>
              <option value="Strongly disagree">Strongly disagree</option>
              <option value="Rather disagree">Rather disagree</option>
              <option value="Neutral">Neutral</option>
              <option value="Rather agree">Rather agree</option>
              <option value="Strongly agree">Strongly agree</option>
            </select>
            <button onClick={() => handleRemoveExpert(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddExpert}>Add Expert</button>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div className="result">
          <h2>Calculation results:</h2>
          <p>BEST COMPROMISE: {result.become[0]}</p>
          <p>{`MAX ERROR = ${result.maxError}`}</p>
        </div>
      )}
    </div>
  );
}

export default LikertTool;
