// LikertTool.js
import React, { useState } from 'react';
import axios from 'axios';
import './LikertTool.css'; // Подключите CSS-стили здесь

function LikertTool() {
  const [expertData, setExpertData] = useState([{ value: 'Null' }]);
  const [result, setResult] = useState(null);

  const handleSelectChange = (index, value) => {
    const newExpertData = [...expertData];
    newExpertData[index].value = value;
    // Если выбран ответ 'Null', удаляем следующие поля
    if (value === 'Null') {
      newExpertData.splice(index + 1);
    } else {
      // Если выбран ответ, добавляем новое поле для следующего мнения
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

export default LikertTool;
