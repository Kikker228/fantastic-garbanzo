import React, { useState } from 'react';
import axios from 'axios';
import './LikertTool.css';

const LikertTool = () => {
  const [expertJudgments, setExpertJudgments] = useState([
    // Инициализируйте оценки экспертов по умолчанию
  ]);

  const [result, setResult] = useState(null);

  const handleInputChange = (index, value) => {
    // Обработчик изменения оценок экспертов
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
    <div className="likert-tool">
      <h2>Likert Tool</h2>
      <div className="likert-form">
        {expertJudgments.map((value, index) => (
          <div key={index} className="likert-row">
            <label>Expert {index + 1}:</label>
            <select onChange={(e) => handleInputChange(index, e.target.value)}>
              <option value="Strongly disagree">Strongly disagree</option>
              <option value="Rather disagree">Rather disagree</option>
              <option value="Neutral">Neutral</option>
              <option value="Rather agree">Rather agree</option>
              <option value="Strongly agree">Strongly agree</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div className="result">
          <h3>Results:</h3>
          {result.become.map((value, index) => (
            <p key={index}>{`become[${index}] = ${value}`}</p>
          ))}
          <p>{`maxError = ${result.maxError}`}</p>
        </div>
      )}
    </div>
  );
};

export default LikertTool;
