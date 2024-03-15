import React, { useState } from 'react';
import axios from 'axios';
import './IntervalTool.css';

function IntervalTool() {
  const [expertCount, setExpertCount] = useState(1);
  const [expertData, setExpertData] = useState(Array.from({ length: expertCount }, () => ({ name: '', values: [0, 0, 0] })));
  const [result, setResult] = useState(null);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newExpertData = expertData.map((rowData, rIndex) =>
      rIndex === rowIndex
        ? {
            ...rowData,
            values: rowData.values.map((cellData, cIndex) => (cIndex === colIndex ? parseFloat(value) || 0 : cellData)),
          }
        : rowData
    );
    setExpertData(newExpertData);
  };

  const handleAddRow = () => {
    setExpertCount(expertCount + 1);
    setExpertData([...expertData, { name: '', values: [0, 0, 0] }]);
  };

  const handleRemoveRow = (index) => {
    if (expertCount === 1) return;
    setExpertCount(expertCount - 1);
    const newExpertData = [...expertData];
    newExpertData.splice(index, 1);
    setExpertData(newExpertData);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://77.91.68.118:3000/calculate', {
        expertData: expertData.map((item) => item.values),
      });

      const { become, maxError } = response.data.result;

      const finalResponse = await axios.post('http://77.91.68.118:3000/Calculate', {
        expertData: become.map((item) => [item]),
      });

      const finalBecome = finalResponse.data.result;

      setResult({ become: finalBecome.become, maxError: finalBecome.maxError });
    } catch (error) {
      console.error('Error calculating:', error.message);
    }
  };

  const handleClear = () => {
    setExpertCount(1);
    setExpertData(Array.from({ length: 1 }, () => ({ name: '', values: [0, 0, 0] })));
    setResult(null);
  };

  return (
    <div className="interval-tool">
      <h1>IntervalTool Calculation</h1>
      <div className="usage-instructions">
        <h2>Usage Instructions</h2>
        <p>
          Welcome to the Interval Tool! This tool allows you to gather expert opinions using fuzzy numbers or intervals.
          Follow these steps:
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
              setExpertData(Array.from({ length: count }, () => ({ name: '', values: [0, 0, 0] })));
            }
          }}
        />
      </div>
      <div className="input-table">
        <div className="row header">
          <div className="cell_one">Name</div>
          <div className="cell">Best proposal</div>
          <div className="cell">Lower limit</div>
          <div className="cell">Upper limit</div>
          <div className="cell">Remove</div>
        </div>
        {expertData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <input className="cell_one"
              type="text"
              value={row.name}
              onChange={(e) =>
                setExpertData(
                  expertData.map((item, index) => (index === rowIndex ? { ...item, name: e.target.value } : item))
                )
              }
            />
            {row.values.map((value, colIndex) => (
              <input className="cell_row"
                key={colIndex}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
            <button onClick={() => handleRemoveRow(rowIndex)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear All</button>
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

export default IntervalTool;
