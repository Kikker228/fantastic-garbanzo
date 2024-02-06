// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [expertJudgments, setExpertJudgments] = useState([
    Array(13).fill(0),
    Array(13).fill(0),
    Array(13).fill(0)
  ]);

  const [result, setResult] = useState(null);

  const handleInputChange = (row, col, value) => {
    const newExpertJudgments = [...expertJudgments];
    newExpertJudgments[row][col] = parseFloat(value) || 0;
    setExpertJudgments(newExpertJudgments);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calculate', {
        expertJudgments
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>BeCoMe Calculation</h1>
      <div className="input-table">
        {expertJudgments.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleCalculate}>Рассчитать</button>
      {result && (
        <div className="result">
          <h2>Результаты расчета:</h2>
          {result.become.map((value, index) => (
            <p key={index}>{`become[${index}] = ${value}`}</p>
          ))}
          <p>{`maxError = ${result.maxError}`}</p>
        </div>
      )}
    </div>
  );
}

export default App;
