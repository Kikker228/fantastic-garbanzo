// IntervalTool.js
import React, { useState } from 'react';
import axios from 'axios';
import './IntervalTool.css'; // Подключите CSS-стили здесь

function IntervalTool() {
  const [expertData, setExpertData] = useState([
    [75 ],
    [25 ],
    [0  ],
    [0  ],
    [100],
    [50 ],
    [25 ],
    [75 ],
    [25 ],
    [25 ],
    [0  ],
    [75 ],
    [50 ],
    [75 ],
    [25 ],
    [50 ],
    [25 ],
    [25 ],
    [25 ],
    [0  ],
    [25 ],
    [25 ]    
  ]);

  const [result, setResult] = useState(null);

  const handleInputChange = (row, col, value) => {
    const newExpertData = [...expertData];
    newExpertData[row][col] = parseFloat(value) || 0;
    setExpertData(newExpertData);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calculate', {
        expertData
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error.message);
    }
  };

  return (
    <div className="interval-tool">
      <h1>IntervalTool Calculation</h1>
      <div className="input-table">
        {expertData.map((row, rowIndex) => (
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

export default IntervalTool;
