// LikertTool.js
import React, { useState } from 'react';
import axios from 'axios';
import './LikertTool.css'; // Подключите CSS-стили здесь

function LikertTool() {
  const [expertData, setExpertData] = useState([{ value: 'Null' }]);
  const [result, setResult] = useState(null);

  const handleSelectChange = (index, value) => {
    // Создаем копию массива expertData
    const newExpertData = [...expertData];
  
    // Обновляем значение мнения по индексу
    newExpertData[index] = { value };
  
    // Удаляем мнения после измененного, если выбрано 'Null'
    if (value === 'Null') {
      newExpertData.splice(index, 1);
    }

  
    // Если последнее мнение не равно 'Null', добавляем новое пустое мнение
    if (newExpertData[newExpertData.length - 1].value !== 'Null') {
      newExpertData.push({ value: 'Null' });
    }
  
    setExpertData(newExpertData);
  };
  

  const handleCalculate = async () => {
    // Фильтруем только выбранные ответы
    const selectedAnswers = expertData
      .filter((item) => item.value !== 'Null')
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
      const response = await axios.post('http://localhost:3000/calculate', {
        expertData: selectedAnswers
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error.message);
    }
  };

  return (
    <div className="likert-tool">
      <h1>LikertTool Calculation</h1>
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
      <div className="input-table">
        {expertData.map((item, index) => (
          <div key={index} className="row">
            <select
              value={item.value}
              onChange={(e) => handleSelectChange(index, e.target.value)}
            >
              <option value="Null">Null</option>
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
          <h2>Calculation results:</h2>
          {console.log(result.become)}
          <p>BEST COMPROMISE: {result.become[0]}</p>
          <p>{`MAX ERROR = ${result.maxError}`}</p>
        </div>
      )}
    </div>
  );
}

export default LikertTool;
