import React, { useState } from 'react';
import axios from 'axios';
import './IntervalTool.css'; // Подключите CSS-стили здесь

function IntervalTool() {
  const [expertData, setExpertData] = useState([
    [0, 0, 0],
  ]);

  const rotateMatrix = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const rotatedMatrix = [];

    for (let col = 0; col < numCols; col++) {
      const newRow = [];
      for (let row = 0; row < numRows; row++) {
        newRow.push(matrix[row][col]);
      }
      rotatedMatrix.push(newRow);
    }

    return rotatedMatrix;
  };

  const [result, setResult] = useState(null);

  const handleInputChange = (row, col, value) => {
    const newExpertData = expertData.map((rowData, rIndex) =>
      rIndex === row ? rowData.map((cellData, cIndex) => (cIndex === col ? parseFloat(value) || 0 : cellData)) : rowData
    );
    setExpertData(newExpertData);

    const lastRow = expertData[expertData.length - 1];
    if (!lastRow.some((val) => val !== 0)) {
      setExpertData([...newExpertData, [0, 0, 0]]);
    }
  };

  const handleBlur = (rowIndex) => {
    const row = expertData[rowIndex];
    const isEmptyRow = row.every((value) => value === 0);

    if (isEmptyRow && expertData.length > 1) {
      const newExpertData = [...expertData];
      newExpertData.splice(rowIndex, 1);
      setExpertData(newExpertData);
    }
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calculate', {
        expertData: expertData,
      });

      const { become, maxError } = response.data.result;

      const finalResponse = await axios.post('http://localhost:3000/Calculate', {
        expertData: become.map((item) => [item]),
      });

      const finalBecome = finalResponse.data.result;

      setResult({ become: finalBecome.become, maxError: finalBecome.maxError });
    } catch (error) {
      console.error('Error calculating:', error.message);
    }
  };

  return (
    <div className="interval-tool">
      <h1>IntervalTool Calculation</h1>
      <div className="usage-instructions">
        <h2>Usage Instructions</h2>
        <p>
          Welcome to the Interval Tool! This tool allows you to gather expert opinions using fuzzy numbers or intervals. Follow these steps:
        </p>
        <ol>
          <li>Enter expert opinions in the input table.</li>
          <li>Click the "Calculate" button to obtain the results.</li>
          <li>Review the results to make informed decisions.</li>
        </ol>
      </div>
      <div className="input-table">
        {expertData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                onBlur={() => handleBlur(rowIndex)}
              />
            ))}
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

export default IntervalTool;
